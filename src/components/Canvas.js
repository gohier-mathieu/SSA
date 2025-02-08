import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Canvas = () => {
  const canvasRef = useRef(null);

    
  
    useEffect(() => {
      const canvas = canvasRef.current; // Récupération du canvas via la ref
      const scene = new THREE.Scene();
  
      // Dimensions
      const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      };
  
      // Camera
      const camera = new THREE.PerspectiveCamera(
        35,
        sizes.width / sizes.height,
        0.1,
        100
      );
      camera.position.set(0, 0, 30);
      scene.add(camera);
  
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
      renderer.setClearColor('#181818');
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(sizes.pixelRatio);
  
      // OrbitControls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.enableRotate = false;
  
      // Loaders
      const textureLoader = new THREE.TextureLoader();
  
      // Displacement settings
      const displacement = {};
  
      displacement.canvas = document.createElement('canvas');
      displacement.canvas.width = 128;
      displacement.canvas.height = 128;
      displacement.context = displacement.canvas.getContext('2d');
      displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);
  
      displacement.glowImage = new Image();
      displacement.glowImage.src = '/img/img/glow.png';
      displacement.texture = new THREE.CanvasTexture(displacement.canvas);
  
      // Interactive plane
      displacement.interactivePlane = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshBasicMaterial({ color: 'red', side: THREE.DoubleSide })
      );
      displacement.interactivePlane.visible = false;
      scene.add(displacement.interactivePlane);
  
      // Raycaster
      displacement.raycaster = new THREE.Raycaster();
      displacement.screenCursor = new THREE.Vector2(9999, 9999);
      displacement.canvasCursor = new THREE.Vector2(9999, 9999);
      displacement.canvasCursorPrevious = new THREE.Vector2(9999, 9999);
  
      window.addEventListener('pointermove', (event) => {
        displacement.screenCursor.x = (event.clientX / sizes.width) * 2 - 1;
        displacement.screenCursor.y = -(event.clientY / sizes.height) * 2 + 1;
      });
  
      // Particles
      const particlesGeometry = new THREE.PlaneGeometry(10, 10, 256, 256);
      particlesGeometry.setIndex(null);
      particlesGeometry.deleteAttribute('normal');
  
      const intensitiesArray = new Float32Array(particlesGeometry.attributes.position.count);
      const anglesArray = new Float32Array(particlesGeometry.attributes.position.count);
  
      for (let i = 0; i < particlesGeometry.attributes.position.count; i++) {
        intensitiesArray[i] = Math.random();
        anglesArray[i] = Math.random() * Math.PI * 2;
      }
  
      particlesGeometry.setAttribute('aIntensity', new THREE.BufferAttribute(intensitiesArray, 1));
      particlesGeometry.setAttribute('aAngle', new THREE.BufferAttribute(anglesArray, 1));
  
      const particlesVertexShader = `
  uniform vec2 uResolution;
  uniform sampler2D uPictureTexture;
  uniform sampler2D uDisplacementTexture;
  
  attribute float aIntensity;
  attribute float aAngle;
  
  varying vec3 vColor;
  
  void main()
  {
      // Déplacement basé sur la texture de displacement
      vec3 newPosition = position;
      float displacementIntensity = texture2D(uDisplacementTexture, uv).r;
      displacementIntensity = smoothstep(0.1, 0.3, displacementIntensity);
  
      vec3 displacement = vec3(
          cos(aAngle) * 0.2,
          sin(aAngle) * 0.2,
          1.0
      );
      displacement = normalize(displacement);
      displacement *= displacementIntensity;
      displacement *= 3.0;
      displacement *= aIntensity;
  
      newPosition += displacement;
  
      // Position finale après transformation dans le modèle, vue et projection
      vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;
      gl_Position = projectedPosition;
  
      // Récupération de l'intensité de la photo pour ajuster la taille du point
      float pictureIntensity = texture2D(uPictureTexture, uv).r;
  
      // Calcul de la taille du point en fonction de la position et de la résolution
      gl_PointSize = 0.08 * pictureIntensity * uResolution.y;
      gl_PointSize *= (1.0 / -viewPosition.z);
  
      // Transmission de la couleur au fragment shader
      vColor = vec3(pow(pictureIntensity, 2.0));
  }
  `;
  
  
  const particlesFragmentShader = `
  varying vec3 vColor;
  
  void main()
  {
      vec2 uv = gl_PointCoord;
      float distanceToCenter = length(uv - vec2(0.5));
  
      // Si on est en dehors du cercle, on ignore ce pixel
      if(distanceToCenter > 0.5)
          discard;
  
      // Application d'un filtre couleur noir et or
      vec3 gold = vec3(1.0, 0.843, 0.0); // Couleur de l'or (RVB)
      vec3 black = vec3(0.0, 0.0, 0.0); // Noir
  
      // Ajustement de la couleur : créer un dégradé noir à or en fonction de l'intensité
      vec3 finalColor = mix(black, gold, vColor.r);
  
      gl_FragColor = vec4(finalColor, 1.0);
  }
  `;
  const pictureTexture = textureLoader.load(
    '/img/img/LogoSSA7-removebg.png',
    () => {
      // Le chargement de la texture a réussi, on peut ajouter les particules
      particlesMaterial.uniforms.uPictureTexture.value = pictureTexture;
    },
    undefined, // Option pour gérer la progression du chargement
    (err) => {
      console.error('Erreur lors du chargement de l\'image', err);
    }
  );
  
  
      const particlesMaterial = new THREE.ShaderMaterial({
        vertexShader: particlesVertexShader,
        fragmentShader: particlesFragmentShader,
        uniforms: {
          uResolution: new THREE.Uniform(
            new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)
          ),
          uPictureTexture: new THREE.Uniform(
            textureLoader.load('./asyl.png')
          ),
          uDisplacementTexture: new THREE.Uniform(displacement.texture),
        },
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
  
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
  
      // Animation
      const tick = () => {
        controls.update();
  
        // Raycaster logic
        displacement.raycaster.setFromCamera(displacement.screenCursor, camera);
        const intersections = displacement.raycaster.intersectObject(displacement.interactivePlane);
  
        if (intersections.length) {
          const uv = intersections[0].uv;
          displacement.canvasCursor.x = uv.x * displacement.canvas.width;
          displacement.canvasCursor.y = (1 - uv.y) * displacement.canvas.height;
        }
  
        // Update displacement canvas
        displacement.context.globalCompositeOperation = 'source-over';
        displacement.context.globalAlpha = 0.02;
        displacement.context.fillRect(0, 0, displacement.canvas.width, displacement.canvas.height);
  
        const cursorDistance = displacement.canvasCursorPrevious.distanceTo(displacement.canvasCursor);
        displacement.canvasCursorPrevious.copy(displacement.canvasCursor);
        const alpha = Math.min(cursorDistance * 0.05, 1);
  
        const glowSize = displacement.canvas.width * 0.25;
        displacement.context.globalCompositeOperation = 'lighten';
        displacement.context.globalAlpha = alpha;
        displacement.context.drawImage(
          displacement.glowImage,
          displacement.canvasCursor.x - glowSize * 0.5,
          displacement.canvasCursor.y - glowSize * 0.5,
          glowSize,
          glowSize
        );
  
        displacement.texture.needsUpdate = true;
  
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
      };
  
      tick();
  
      // Handle resize
      const handleResize = () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
  
        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
  
        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
        // Update shader uniforms
        particlesMaterial.uniforms.uResolution.value.set(
          sizes.width * sizes.pixelRatio,
          sizes.height * sizes.pixelRatio
        );
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default Canvas;
