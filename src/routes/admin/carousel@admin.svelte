<script>
	import ImageModal from '$lib/utils/ImageModal.svelte';
	import ImageCropper from '../../lib/utils/ImageCropper.svelte';

	import Modal from '$lib/utils/Modal.svelte';
	let show;
	let methodType;
	let isUpload;
	let showConfirm;
	let carousel = {
		id: 0,
		imageUrl: '',
		updateImage: false,
		oldImage: ''
	};
	let isValid = false;
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Carousel</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Collection"
			clear={() => clearData(collection)}
			bind:methodType
			{isUpload}
			{isValid}
		>
			<div class="px-5">
				<ImageCropper
					disabled={isUpload}
					bind:croppedImage={carousel.imageUrl}
					bind:status={carousel.updateImage}
				/>
			</div>
		</Modal>
	</div>

	<div class="grid grid-cols-5 mt-10 gap-5 justify-items-center ">
		<ImageModal src="/assets/img/a.jpg" type="gallery" bind:showConfirm />
	</div>
</div>
