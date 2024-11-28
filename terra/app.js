let cycleIndex = 0; 
const imageSpeedFactor = 200; 
const initialPositions = [
    { left: 1500, top: 100 }, 
    { left: 750, top: 300 }, 
    { left: 780, top: '50%' }, 
    { left: 40, top: '5%' }, 
    { left: 70, top: '10%' }, 
    { left: 70, top: '50%' }, 
    { left: 80, top: '30%' }, 
    { left: 20, top: '70%' },
];

let cycleCompleted = false; 


function main() {
    const canvas = document.querySelector('#c');

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);


    const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
        roughness: 1,
        metalness: 0,
        map: new THREE.TextureLoader().load('texture/earthmap1k.jpg'),
        bumpMap: new THREE.TextureLoader().load('texture/earthbump.jpg'),
        bumpScale: 0.3,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);


    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointerLight = new THREE.PointLight(0xffffff, 0.9);
    pointerLight.position.set(5, 3, 5);
    scene.add(pointerLight);

    const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        map: new THREE.TextureLoader().load('texture/earthCloud.png'),
        transparent: true,
    });
    const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloudMesh);

    function animate() {
        requestAnimationFrame(animate);


        earthMesh.rotation.y -= 0.0025; 
        cloudMesh.rotation.y += 0.0015; 

        moveAllImagesLeft(0.0025); 
        renderer.render(scene, camera);
    }

    animate();
    startImageCycle(); 
}


function moveAllImagesLeft(speed) {
    const images = document.querySelectorAll('.cycle-image'); 
    let allImagesOutOfScreen = true; 

    images.forEach((image) => {
        const currentLeft = parseFloat(image.style.left); 
        if (!isNaN(currentLeft)) {
            
            if (currentLeft < -200) {
                image.style.left = `${window.innerWidth}px`; 
            } else {
                image.style.left = `${currentLeft - speed * imageSpeedFactor}px`; 
            }
            if (currentLeft > -200) {
                allImagesOutOfScreen = false; 
            }
        }
    });

   
    if (allImagesOutOfScreen && !cycleCompleted) {
        cycleCompleted = true; 
        resetImagesPosition(); 
        cycleCompleted = false; 
    }
}


function startImageCycle() {
    const images = document.querySelectorAll('.cycle-image');
    const totalImages = images.length; 

    setInterval(() => {

        const currentImg1Index = cycleIndex % totalImages;
        const currentImg2Index = (cycleIndex + 1) % totalImages;

        images[currentImg1Index].style.opacity = 0;
        images[currentImg2Index].style.opacity = 0;


        setTimeout(() => {
            const nextImg1Index = (cycleIndex + 2) % totalImages;
            const nextImg2Index = (cycleIndex + 3) % totalImages;

            images[nextImg1Index].style.opacity = 1;
            images[nextImg2Index].style.opacity = 1;

          
            cycleIndex = (cycleIndex + 2) % totalImages;
        }, 1000); 
    }, 5000); 
}


function resetImagesPosition() {
    const images = document.querySelectorAll('.cycle-image');
    images.forEach((image, index) => {
        const position = initialPositions[index];

        image.style.left = `${position.left}px`;
        image.style.top = position.top;
        image.style.opacity = 1; 
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('background-music');


    music.play().catch(() => {
        console.warn('A reprodução automática foi bloqueada pelo navegador.');
    });
});


window.onload = main;
