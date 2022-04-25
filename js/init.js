let renderer, scene, animationFrame, labelRenderer;
const canvas = document.getElementById('c');
const content = document.getElementById('StarterIns');
const emptyScene = new THREE.Scene();
const emptyCamera = new THREE.PerspectiveCamera();
const pieces = new THREE.Group();

function preloadPieces() {
  const loader = new THREE.GLTFLoader();
  const dracoLoader = new THREE.DRACOLoader();
  dracoLoader.setDecoderPath('./js/THREE/');
  loader.setDRACOLoader(dracoLoader);

  const glbFiles = ["Perseverance.glb", "Ingenuity.glb"];

  const scomme = [];
  let totalSize = 0;

// PRELOAD ALL PIECES FROM GLB FOLDER
  const sek = Date.now();

  glbFiles.forEach(glbFile => {
    loader.load('./res/models/' + glbFile,
      function(glb) {
	pieces.userData[glbFile.slice(0,-4)] = glb.scene;
      },
      function (xhr) {
	if (xhr.loaded === xhr.total) {
	totalSize += xhr.total;
	scomme.push(glbFile.slice(0,-4));
	 console.log(`${glbFile} loaded ${100*xhr.loaded/xhr.total}%`);
	}
	if (scomme.length === glbFiles.length) {
	  const jek = Date.now();
	  console.log(`${glbFiles.length} pieces took a total of ${jek - sek}ms to load\r\nThe current pieces are taking ${Math.round(100*totalSize/(1024**2))/100}MB of memory`);
	  const checkPieces = setInterval(()=>{
	    if (Object.keys(pieces.userData).length === glbFiles.length) {
	      clearInterval(checkPieces);
	      console.log(`Finished in ${Math.round((Date.now() - sek)/100)/10}s`);
	      console.log(pieces.userData);
 init();
	    } else if (Date.now() - jek >= 3000) {
	      clearInterval(checkPieces);
		Object.keys(pieces.userData).forEach(a=>{
		  if (!glbFiles.includes(`${legoKey[a]}.glb`)) {
		    console.log(legoKey[a], ' was not loaded')
		  }
		});
	        console.log('Although everything was successfully loaded, it took more than 20sec to clone/decode the pieces, so the operation was canceled');
	        console.log(pieces.userData);
	    }
	  }, 5);
	}
      },
      function (err) {
	console.log(err);
      }
    );
  });
}


function init() {
//SCENE
	scene = new THREE.Scene();

	const Tloader = new THREE.TextureLoader();
	 const texture = Tloader.load(
	 './res/mars-equi1.jpg', () => {
	    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
	    rt.fromEquirectangularTexture(renderer, texture);
//	    scene.background = rt.texture;
	  });

	scene.fog = new THREE.Fog( 0xefd1b5 );
	

	scene.background = new THREE.Color(0xfff4e2);

	scene.userData.labels = [];

	const element = document.getElementsByClassName("stage")[0];
	scene.userData.element = element;

//CAMERA
	const camera = new THREE.PerspectiveCamera(39.6, element.offsetWidth/element.offsetHeight, 0.001, 20);
	camera.position.set(5, 5, 5);
	scene.userData.camera = camera;

//ORBIT CONTROLS
	const controls = new THREE.OrbitControls(scene.userData.camera, scene.userData.element);
	controls.minDistance = 0.5;
	controls.maxDistance = 8;
	controls.enablePan = true;
	controls.enableZoom = true;
	controls.enableDamping = true;
	controls.dampingFactor = 0.075;
	controls.zoomSpeed = 0.4;
	scene.userData.controls = controls;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;

//ADD OBJECTS
	scene.add(pieces.userData['Perseverance']);
	scene.add(pieces.userData['Ingenuity']);
scene.children[1].position.set(2, 0, 0);


//LIGHTS
//	scene.add(new THREE.HemisphereLight( 0xffffff, 0x404040, 3 ));

//PHYSICALLY CORRECT AND ALL

	const lux = 0.25*Math.PI;

	scene.add( new THREE.AmbientLight( 0xffffff, 1 ) );

	const dirLight0 = new THREE.DirectionalLight( 0xffffff, lux/2 );
	dirLight0.position.set( 0, 0.8, 0 );
	scene.add( dirLight0 );

	const dirLight = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight.position.set( 0, 0.8, 1 );
	scene.add( dirLight );

	const dirLight1 = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight1.position.set( 0.866, 0.8, -0.5 );
	scene.add( dirLight1 );

	const dirLight2 = new THREE.DirectionalLight( 0xffffff, lux );
	dirLight2.position.set( -0.866, 0.8, -0.5 );
	scene.add( dirLight2 );


//GROUND (GridHelper)
	const gridHelper = new THREE.GridHelper( 10, 20 );
//	scene.add(gridHelper);

  const circleGeometry = new THREE.CircleGeometry(5,200,0,2*Math.PI);
  const material =  new THREE.MeshLambertMaterial({color: 0xb0ffa0, transparent: true, opacity: 0.8});
  const material1 = new THREE.MeshDepthMaterial({color: 0xb0ffa0});
  const material2 = new THREE.MeshPhongMaterial( {color: 0xb0ffa0, shininess: 0 , reflectivity: 0.5, opacity: 0.75} );
  const ground = new THREE.Mesh(circleGeometry, material2);
  ground.rotation.x = - Math.PI / 2;
  ground.rotation.z = - Math.PI / 2;
  ground.scale.multiplyScalar( 1 );
  ground.receiveShadow = true;
  scene.add( ground );

//RENDERER FOR ALL SCENES
    renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true, alpha: true});
    renderer.setClearColor(0xf0f0f3, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = false;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.gammaFactor = 2.2;
    renderer.physicallyCorrectLights = true;
    renderer.setScissorTest(true);

    renderer.toneMapping = THREE.LinearToneMapping;
    renderer.toneMappingExposure = 1;


//ACTION
    animate();
    setTimeout(() => {
//      cancelAnimationFrame(animationFrame);
    }, 500);
    scene.userData.controls.addEventListener('change', render);
    window.addEventListener('resize', render);

console.log(scene);
}

function updateSize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      renderer.setSize(width, height, false);
      if (scene.userData.labelRenderer) {
	scene.userData.labelRenderer.setSize(scene.userData.element.clientWidth, scene.userData.element.clientHeight);
      }
    }
}

function animate() {
    render();
    scene.userData.controls.update();
    animationFrame = requestAnimationFrame(animate);
}

function render() {
    updateSize();

    if (!renderer) {cancelAnimationFrame(animationFrame);return;};
    renderer.clear();

	// set the viewport
	const element = scene.userData.element;
	const rect = element.getBoundingClientRect();
	const width = rect.right - rect.left;
	const height = rect.bottom - rect.top;
	const left = rect.left;
	const bottom = renderer.domElement.clientHeight - rect.bottom;
	const camera = scene.userData.camera;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();


	renderer.setViewport(0, 0, renderer.domElement.clientWidth, renderer.domElement.clientHeight);
	renderer.setScissor(0, 0, renderer.domElement.clientWidth, renderer.domElement.clientHeight);

	renderer.render(scene, scene.userData.camera);

	if (scene.userData.labelRenderer) {
          if (!scene.userData.labelRenderer.width || !scene.userData.labelRenderer.height) {
	    scene.userData.labelRenderer.setSize(scene.userData.element.clientWidth, scene.userData.element.clientHeight);
          }
	  scene.userData.labelRenderer.render(scene, scene.userData.camera);
	}
}



function diseng() {
  window.removeEventListener('resize', render);
  cancelAnimationFrame(animationFrame);
  cancelAnimationFrame(zhoop);
  scene.userData.controls.dispose();
  scene = null;
  renderer.render(emptyScene, emptyCamera);
  renderer.dispose();
  renderer = null;
}

window.addEventListener('DOMContentLoaded', () => {
  preloadPieces();
})