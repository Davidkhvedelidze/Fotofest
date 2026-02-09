"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { logError } from "@/lib/services/logger";

const HoverImageShader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) return;

    let animationId: number;
    let mesh: THREE.Mesh | null = null;
    let baseTexture: THREE.Texture | null = null;
    let hoverTexture: THREE.Texture | null = null;
    let uniforms: {
      u_image: { value: THREE.Texture };
      u_imagehover: { value: THREE.Texture };
      u_mouse: { value: THREE.Vector2 };
      u_time: { value: number };
      u_res: { value: THREE.Vector2 };
    } | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    const scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    camera = new THREE.PerspectiveCamera(
      (2 * Math.atan(window.innerHeight / 2 / 800) * 180) / Math.PI,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 800;

    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const loader = new THREE.TextureLoader();
    const hoverSrc = imageRef.current.dataset.hover || imageRef.current.src;

    // Initialize textures - wait for base texture to load before starting
    baseTexture = loader.load(
      imageRef.current.src,
      () => {
        // Base texture loaded, now initialize mesh
        initMesh();
      },
      undefined,
      (error) => {
        logError({ message: "Error loading base texture", error });
      }
    );

    hoverTexture = loader.load(
      hoverSrc,
      () => {
        // Hover texture loaded
      },
      undefined,
      (error) => {
        logError({ message: "Error loading hover texture", error });
      }
    );

    uniforms = {
      u_image: { value: baseTexture },
      u_imagehover: { value: hoverTexture },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_time: { value: 0 },
      u_res: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
    };

    function initMesh() {
      if (
        !imageRef.current ||
        !uniforms ||
        !baseTexture ||
        !hoverTexture ||
        !canvasRef.current
      )
        return;

      // Hide canvas initially
      canvasRef.current.style.opacity = "0";

      // Wait for next frame to ensure layout is stable
      requestAnimationFrame(() => {
        if (!imageRef.current || !canvasRef.current || !uniforms) return;

        imageRef.current.style.opacity = "0";

        const rect = imageRef.current.getBoundingClientRect();

        const sizes = new THREE.Vector2(rect.width, rect.height);
        const offset = new THREE.Vector2(
          rect.left - window.innerWidth / 2 + rect.width / 2,
          -rect.top + window.innerHeight / 2 - rect.height / 2
        );

        const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        const material = new THREE.ShaderMaterial({
          uniforms,
          defines: {
            PR: window.devicePixelRatio.toFixed(1),
          },
          vertexShader: `
          varying vec2 v_uv;
          void main() {
            v_uv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
          `,
          fragmentShader: `
          uniform vec2 u_mouse;
          uniform vec2 u_res;
          uniform sampler2D u_image;
          uniform sampler2D u_imagehover;
          uniform float u_time;
          varying vec2 v_uv;

          float circle(in vec2 _st, in float _radius, in float blurriness) {
            vec2 dist = _st;
            return 1.0 - smoothstep(_radius - (_radius * blurriness), _radius + (_radius * blurriness), dot(dist, dist) * 4.0);
          }

          vec3 mod289(vec3 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
          }

          vec4 mod289(vec4 x) {
            return x - floor(x * (1.0 / 289.0)) * 289.0;
          }

          vec4 permute(vec4 x) {
            return mod289(((x * 34.0) + 1.0) * x);
          }

          vec4 taylorInvSqrt(vec4 r) {
            return 1.79284291400159 - 0.85373472095314 * r;
          }

          float snoise3(vec3 v) {
            const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
            const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

            vec3 i = floor(v + dot(v, C.yyy));
            vec3 x0 = v - i + dot(i, C.xxx);

            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min(g.xyz, l.zxy);
            vec3 i2 = max(g.xyz, l.zxy);

            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;

            i = mod289(i);
            vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

            float n_ = 0.142857142857;
            vec3 ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_);

            vec4 x = x_ * ns.x + ns.yyyy;
            vec4 y = y_ * ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4(x.xy, y.xy);
            vec4 b1 = vec4(x.zw, y.zw);

            vec4 s0 = floor(b0) * 2.0 + 1.0;
            vec4 s1 = floor(b1) * 2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
            vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

            vec3 p0 = vec3(a0.xy, h.x);
            vec3 p1 = vec3(a0.zw, h.y);
            vec3 p2 = vec3(a1.xy, h.z);
            vec3 p3 = vec3(a1.zw, h.w);

            vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
            m = m * m;
            return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
          }

          void main() {
            vec2 res = u_res * PR;
            vec2 st = gl_FragCoord.xy / res.xy - vec2(0.5);
            st.y *= u_res.y / u_res.x;

            vec2 mouse = u_mouse * -0.5;
            vec2 circlePos = st + mouse;
            float c = circle(circlePos, 0.15, 2.0) * 2.5;

            float offx = v_uv.x + sin(v_uv.y + u_time * 0.1);
            float offy = v_uv.y - u_time * 0.1 - cos(u_time * 0.001) * 0.01;

            float n = snoise3(vec3(offx, offy, u_time * 0.1) * 8.0) - 1.0;

            float finalMask = smoothstep(0.4, 0.5, n + pow(c, 2.0));

            vec4 image = texture2D(u_image, v_uv);
            vec4 hover = texture2D(u_imagehover, v_uv);

            vec4 finalImage = mix(image, hover, finalMask);

            gl_FragColor = finalImage;
          }
          `,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(offset.x, offset.y, 0);
        mesh.scale.set(sizes.x, sizes.y, 2);
        scene.add(mesh);

        // Show canvas after mesh is positioned
        canvasRef.current.style.opacity = "1";
        animate();
      });
    }

    function animate() {
      if (!renderer || !camera || !uniforms) return;

      uniforms.u_time.value += 0.01;
      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    }

    function onMouseMove(e: PointerEvent) {
      if (!uniforms || !mesh) return;

      gsap.to(uniforms.u_mouse.value, {
        duration: 0.5,
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });

      gsap.to(mesh.rotation, {
        duration: 0.5,
        x: 0.3 * -uniforms.u_mouse.value.y,
        y: uniforms.u_mouse.value.x * (Math.PI / 6),
      });
    }

    function onResize() {
      if (!renderer || !camera || !uniforms || !mesh || !imageRef.current)
        return;

      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      uniforms.u_res.value.set(window.innerWidth, window.innerHeight);

      const rect = imageRef.current.getBoundingClientRect();
      mesh.scale.set(rect.width, rect.height, 2);
      mesh.position.set(
        rect.left - window.innerWidth / 2 + rect.width / 2,
        -rect.top + window.innerHeight / 2 - rect.height / 2,
        0
      );
    }

    window.addEventListener("pointermove", onMouseMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("pointermove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (animationId) cancelAnimationFrame(animationId);
      if (renderer) renderer.dispose();
      if (baseTexture) baseTexture.dispose();
      if (hoverTexture) hoverTexture.dispose();
      if (mesh) {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.ShaderMaterial) {
          mesh.material.dispose();
        }
      }
    };
  }, []);

  return (
    <div className="">
      <section className="container">
        <article className="tile">
          <figure className="tile__figure">
            <img
              ref={imageRef}
              className="tile__image"
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=934&q=80"
              data-hover="https://images.unsplash.com/photo-1522609925277-66fea332c575?auto=format&fit=crop&w=934&q=80"
              alt="hover"
            />
          </figure>
        </article>
      </section>
      <canvas id="stage" ref={canvasRef} />
    </div>
  );
};

export default HoverImageShader;
