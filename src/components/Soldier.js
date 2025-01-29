import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Soldier = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; 
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
    camera.position.set(0, 1, 6);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(sizes.pixelRatio);
    renderer.setClearColor('#181818', 0);

    // OrbitControls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    // Lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Chargement du modèle GLTF
    const loader = new GLTFLoader();
    let mixer;

    loader.load(
        '/model/Character_Soldier.gltf',
        (gltf) => {
          console.log("Modèle chargé :", gltf);
          const model = gltf.scene;
          model.scale.set(0.2, 0.2, 0.2);
          scene.add(model);
      
          mixer = new THREE.AnimationMixer(model);
      
          console.log("Animations disponibles :", gltf.animations);
      
          const walkAnimation = gltf.animations.find(anim => anim.name === 'Walk'); // 'Walk' avec la majuscule
          if (walkAnimation) {
            console.log("Animation 'Walk' trouvée, démarrage...");
          } else {
            console.error("Animation 'Walk' introuvable.");
          }
      
          let direction = 1;
          const speed = 0.005; 
          const maxX = 1; 
          const minX = -2; 
      
          
          model.position.set(-2, -1.7, 0);
          model.rotation.y = Math.PI / 2; // Le soldat regarde à gauche initialement (rotation de 180°)
      
         
          const startWalkAnimation = () => {
            if (walkAnimation) {
              mixer.clipAction(walkAnimation).play();
            }
          };
      
         
          startWalkAnimation();

          const WEAPONS = [
            "GrenadeLauncher",
            "AK",
            "Knife_1",
            "Knife_2",
            "Pistol",
            "Revolver",
            "Revolver_Small",
            "RocketLauncher",
            "ShortCannon",
            "SMG",
            "Shotgun",
            "Shovel",
            "Sniper",
            "Sniper_2",
          ];
          
          const changeWeapon = (weaponName) => {
            
            if (!WEAPONS.includes(weaponName)) {
              console.error(`L'arme ${weaponName} n'existe pas dans la liste des armes disponibles`);
              return;
            }
          
            
            model.traverse((child) => {
              WEAPONS.forEach(weapon => {
                if (child.name && child.name.includes(weapon)) {
                  child.visible = false;
                  console.log(`Cache l'arme : ${child.name}`);
                }
              });
            });
          
           
            model.traverse((child) => {
              if (child.name && child.name.includes(weaponName)) {
                child.visible = true;
                console.log(`Montre l'arme : ${child.name}`);
              }
            });
          };
          
          
          const debugMeshNames = () => {
            model.traverse((child) => {
              if (child.isMesh) {
                console.log("Mesh trouvé :", child.name);
              }
            });
          };
          
         
          debugMeshNames();
          
          
          changeWeapon('AK');
      
          
          const changeColor = () => {
            model.traverse((child) => {
                if (child.isMesh && child.material.name === "Character_Main") {
                    child.material = new THREE.MeshStandardMaterial({
                        color: "blue",
                      });
                  }
            });
          };
    
          changeColor('Body', 0x2c23aa); 
      
          
          const tick = () => {
            model.position.x += direction * speed;
      
            if (model.position.x >= maxX || model.position.x <= minX) {
              direction *= -1; 
              
          
              if (model.position.x >= maxX) {
                model.rotation.y = -Math.PI / 2;
              }
             
              else if (model.position.x <= minX) {
                model.rotation.y = Math.PI / 2;
              }
            }
      
          
            if (mixer) {
              mixer.update(0.01);
            }
      
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick); 
          };
      
          tick();
        },
        undefined,
        (error) => {
          console.error('Erreur lors du chargement du modèle :', error);
        }
      );
      

    const handleResize = () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(sizes.pixelRatio);
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

export default Soldier;
