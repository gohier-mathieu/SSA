import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Soldier = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current; // Référence du canvas
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
    let mixer; // Déclarez le mixer en dehors du loader pour l'utiliser dans l'animation

    loader.load(
        '/model/Character_Soldier.gltf', // Remplacez ce chemin par le chemin vers votre modèle
        (gltf) => {
          console.log("Modèle chargé :", gltf);
          const model = gltf.scene;
          model.scale.set(0.2, 0.2, 0.2);
          scene.add(model);
      
          // Créez un AnimationMixer pour jouer les animations
          mixer = new THREE.AnimationMixer(model);
      
          // Log des animations disponibles
          console.log("Animations disponibles :", gltf.animations);
      
          // Trouver l'animation "Walk" et l'ajouter au mixer
          const walkAnimation = gltf.animations.find(anim => anim.name === 'Walk'); // 'Walk' avec la majuscule
          if (walkAnimation) {
            console.log("Animation 'Walk' trouvée, démarrage...");
          } else {
            console.error("Animation 'Walk' introuvable.");
          }
      
          // Initialisation des variables pour le déplacement
          let direction = 1; // 1 = droite, -1 = gauche
          const speed = 0.005; // Vitesse du mouvement
          const maxX = 1; 
          const minX = -2; 
      
          // Positionner le soldat initialement à x: -2 avec rotation à 0° (regarde à gauche)
          model.position.set(-2, -1.7, 0);
          model.rotation.y = Math.PI / 2; // Le soldat regarde à gauche initialement (rotation de 180°)
      
          // Fonction pour démarrer l'animation de marche
          const startWalkAnimation = () => {
            if (walkAnimation) {
              mixer.clipAction(walkAnimation).play();
            }
          };
      
          // Lancer l'animation dès que tout est prêt
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
            // Vérifier si l'arme existe
            if (!WEAPONS.includes(weaponName)) {
              console.error(`L'arme ${weaponName} n'existe pas dans la liste des armes disponibles`);
              return;
            }
          
            // Première passe : cacher toutes les armes
            model.traverse((child) => {
              WEAPONS.forEach(weapon => {
                if (child.name && child.name.includes(weapon)) {
                  child.visible = false;
                  console.log(`Cache l'arme : ${child.name}`);
                }
              });
            });
          
            // Deuxième passe : montrer uniquement l'arme sélectionnée
            model.traverse((child) => {
              if (child.name && child.name.includes(weaponName)) {
                child.visible = true;
                console.log(`Montre l'arme : ${child.name}`);
              }
            });
          };
          
          // Debug : afficher tous les noms des meshes pour vérifier
          const debugMeshNames = () => {
            model.traverse((child) => {
              if (child.isMesh) {
                console.log("Mesh trouvé :", child.name);
              }
            });
          };
          
          // Appeler la fonction de debug pour voir les noms réels des meshes
          debugMeshNames();
          
          // Exemple d'utilisation
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
    
          changeColor('Body', 0x2c23aa); // Change la couleur du corps en vert
      
          // Animation
          const tick = () => {
            // Mettre à jour la position du modèle
            model.position.x += direction * speed;
      
            // Vérifier si le modèle atteint les bornes (maxX ou minX)
            if (model.position.x >= maxX || model.position.x <= minX) {
              direction *= -1; // Inverser la direction
              
              // Si on arrive à maxX (droite), faire demi-tour pour regarder vers la gauche
              if (model.position.x >= maxX) {
                model.rotation.y = -Math.PI / 2; // -90 degrés pour regarder vers la gauche
              }
              // Si on arrive à minX (gauche), faire demi-tour pour regarder vers la droite
              else if (model.position.x <= minX) {
                model.rotation.y = Math.PI / 2; // 90 degrés pour regarder vers la droite
              }
            }
      
            // Mettez à jour le mixer d'animations à chaque frame
            if (mixer) {
              mixer.update(0.01); // Ajustez la valeur selon la vitesse de l'animation
            }
      
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(tick); // Continue d'appeler la fonction tick pour un cycle infini
          };
      
          // Lancer la fonction tick
          tick();
        },
        undefined,
        (error) => {
          console.error('Erreur lors du chargement du modèle :', error);
        }
      );
      

      

    // Gestion du redimensionnement
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
