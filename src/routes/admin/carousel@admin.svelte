<script>
	import ImageModal from '$lib/utils/ImageModal.svelte';
	import ImageCropper from '../../lib/utils/ImageCropper.svelte';
	import Input from '../../lib/utils/Input.svelte';

	import {
		fetchCarousels,
		carousels,
		postCarousel,
		deletecarousel,
		updatecarousel
	} from '../../store/carousel';
	import Modal from '$lib/utils/Modal.svelte';
	import { clearData, validate } from '../../utils';
	import { onMount } from 'svelte';
	import Confirm from '../../lib/utils/Confirm.svelte';
	import Alert from '../../lib/utils/Alert.svelte';

	let rows = [];
	let rowsCount = 0;

	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default
	const selectors = 'name';
	let text;
	let sorting;
	let loading = true;
	let isShowAlert = false;
	let typeAlert = '';
	let messageAlert = '';
	let selectId = 0;

	let show;
	let methodType;
	let isUpload;
	let showConfirm = false;
	let carousel = {
		id: 0,
		imageUrl: '',
		updateImage: false,
		oldImage: ''
	};

	let filteredCarousels = { rows: [], count: 0 };

	$: {
		filteredCarousels = $carousels;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCarousels({
			offset: _page * pageSize,
			limit: pageSize,
			selectors,
			keyword: text,
			...sorting
		});
		loading = true;
		rows = [...filteredCarousels.rows];
		rowsCount = filteredCarousels.count;
		loading = false;
	}

	const showAlert = (message, type) => {
		isShowAlert = true;
		messageAlert = message;
		typeAlert = type;

		setTimeout(() => {
			isShowAlert = false;
		}, 3000);
	};

	const handleUpdate = async (id) => {
		isUpload = true;
		await updatecarousel(carousel);
		show = false;
		await load();

		isUpload = false;
		showAlert('update Data has Successfully', 'success');
	};

	const handleDelete = async () => {
		await deletecarousel(selectId);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const handlePost = async () => {
		isUpload = true;
		await postCarousel(carousel);
		show = false;
		await load();

		clearData(carousel);
		isUpload = false;

		showAlert('Added Data has Successfully', 'success');
	};
</script>

<Confirm bind:showConfirm onDelete={() => handleDelete()} />
<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Carousel</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Carousel"
			clear={() => clearData(carousel)}
			bind:methodType
			{isUpload}
			isValid={true}
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={carousel.name} disabled={isUpload} />
				<ImageCropper
					disabled={isUpload}
					bind:croppedImage={carousel.imageUrl}
					bind:status={carousel.updateImage}
				/>
			</div>
		</Modal>
	</div>

	<div class="grid grid-cols-5 mt-8 gap-5 justify-items-center ">
		{#if rows}
			{#each rows as row, index (row)}
				<ImageModal
					src={row.imageUrl}
					type="gallery"
					bind:showConfirm
					on:selectId={() => {
						selectId = row.id;
					}}
				/>
			{/each}
		{:else}
			<div class="w-full">
				<div class="w-full bg-slate-300 h-48" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
			</div>
			<div class="w-full">
				<div class="w-full bg-slate-300 h-48" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
			</div>
			<div class="w-full">
				<div class="w-full bg-slate-300 h-48" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
			</div>
			<div class="w-full">
				<div class="w-full bg-slate-300 h-48" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
			</div>
			<div class="w-full">
				<div class="w-full bg-slate-300 h-48" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
				<p class="text-center w-1/2 h-3  bg-slate-300 mt-3" />
			</div>
		{/if}
	</div>
</div>
