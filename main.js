import * as THREE from 'three';

function main() {

	const canvas = document.querySelector( '#c' );
	const renderer = new THREE.WebGLRenderer( { antialias: true, canvas } );
    renderer.setSize( window.innerWidth, window.innerHeight );
	const fov = 75;
	const aspect =  window.innerWidth / window.innerHeight; // the canvas default
    
	const near = 0.1;
	const far = 5;
	const camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
	camera.position.z = 2;

	const scene = new THREE.Scene();

	{

		const color = 0xFFFFFF;
		const intensity = 3;
		const light = new THREE.DirectionalLight( color, intensity );
		light.position.set( - 1, 2, 4 );
		scene.add( light );

	}

	const boxWidth = 1;
	const boxHeight = 1;
	const boxDepth = 1;
	const geometry = new THREE.BoxGeometry( boxWidth, boxHeight, boxDepth );
    const circleGeo= new THREE.CircleGeometry(1,50)

	const material = new THREE.MeshBasicMaterial( { color: 0x44aa88 } ); // greenish blue
    const cubes = [
        makeInstance(geometry, 0x44aa88,  0),
        makeInstance_circle(circleGeo, 0x8844aa, -2),
        makeInstance(geometry, 0xaa8844,  2),
    ];
    console.log(cubes)
	// const cube = new THREE.Mesh( geometry, material );
	// scene.add( cube );

    function makeInstance(geometry, color, x) {
        const material = new THREE.MeshPhongMaterial({color});
        
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        cube.name="Cube";
        
        cube.position.x = x;
        
        return cube;
    }

    function makeInstance_circle(geometry, color, x){
        const material = new THREE.MeshPhongMaterial({color});
        
        const circle = new THREE.Mesh(geometry, material);
        scene.add(circle);
        circle.name="circle";
        circle.position.x = x;
        
        return circle;
    }

// 🎵 Animate
	function render(time) {
		time *= 0.001; // convert to seconds

		cubes.forEach((obj, ndx) => {
			const t = time + ndx * 0.5; // phase shift per object

			if (obj.name === 'Cube') {
				// Rotate and scale rhythmically
				obj.rotation.x = t * 2;
				obj.rotation.y = t * 1.5;
				obj.scale.y = 1 + Math.sin(t * 5) * 0.3;
				obj.position.y = Math.sin(t * 4) * 0.5; // bounce up and down
			}

			if (obj.name === 'circle') {
				// Pulse and move in a wave
				obj.scale.setScalar(1 + Math.sin(t * 3) * 0.4);
				obj.position.y = Math.cos(t * 2) * 0.4;
				obj.rotation.z = Math.sin(t * 3) * 0.5;
			}
		});

		renderer.render(scene, camera);
		requestAnimationFrame(render);
	}

	requestAnimationFrame( render );

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

}

main();
