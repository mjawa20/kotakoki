<script>
	import { onMount } from 'svelte';

	import Cropper from 'svelte-easy-crop';
	import getCroppedImg from './canvasUtils';
	import { clearData } from "./../../utils/index";
	
	let crop = { x: 0, y: 0 };
	let zoom = 1;
	let image, fileinput, pixelCrop;

	export let placeHolder = 'Select a photo';
	export let croppedImage;
	export let status = false;
	export let disabled = false;

	onMount(async () => {
		if (croppedImage) {
			const res = await fetch(croppedImage);
			const blob = await res.blob();
			let reader = new FileReader();
			reader.onload = (e) => {
				image = blob;
			};
			reader.readAsDataURL(blob);
		}
	});

	function onFileSelected(e) {
		let imageFile = e.target.files[0];
		let reader = new FileReader();
		reader.onload = (e) => {
			image = e.target.result;
		};
		reader.readAsDataURL(imageFile);
	}

	function previewCrop(e) {
		pixelCrop = e.detail.pixels;
	}

	async function cropImage() {
		croppedImage = await getCroppedImg(image, pixelCrop);
	}

	function reset() {
		croppedImage = null;
		image = null;
		status = false;
		zoom = 1;
		clearData(crop)
	}
</script>

{#if !image}
	<label
		class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
	>
		<div class="flex flex-col items-center justify-center pt-7">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
					clip-rule="evenodd"
				/>
			</svg>
			<p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
				{placeHolder}
			</p>
		</div>
		<input
			type="file"
			accept=".jpg, .jpeg, .png"
			on:change={(e) => onFileSelected(e)}
			bind:this={fileinput}
			class="opacity-0"
		/>
	</label>
{:else}
	<div class="d-flex ">
		{#if croppedImage}
			<div class="w-full mb-2">
				<img src={croppedImage} alt="Cropped profile" class="object-cover min-w-full" />
			</div>
		{:else}
			<div class="relative w-full h-80 mb-2">
				<Cropper {image} bind:crop bind:zoom on:cropcomplete={previewCrop} aspect={1} />
			</div>
			<button
				class="text-green-500 bg-transparent border border-solid border-green-500 hover:bg-green-500 hover:text-white active:bg-green	-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
				on:click={async () => {
					croppedImage = await getCroppedImg(image, pixelCrop, true);
					status = true;
				}}
			>
				<i class="fas fa-crop" /> Crop
			</button>
		{/if}
		<button
			{disabled}
			class="disabled:border-slate-400 disabled:text-slate-400 text-red-500 bg-transparent border border-solid border-red-500 {!disabled ?"hover:bg-red-500 hover:text-white" : ""} active:bg-red	-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
			type="button"
			on:click={reset}
		>
			<i class="fas fa-repeat" /> Reset
		</button>
	</div>
{/if}
