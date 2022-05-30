<script context="module">
	export async function load({ params }) {
		const productId = params.id;
		return { props: {productId} };
	}
</script>

<script>
	import { fly } from 'svelte/transition';
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import ImageModal from '../../../../lib/utils/ImageModal.svelte';
	import Confirm from '../../../../lib/utils/Confirm.svelte';
	import Modal from '$lib/utils/Modal.svelte';
	import { clearData, validate } from '../../../../utils';
	import Input from '../../../../lib/utils/Input.svelte';
	import ImageCropper from '../../../../lib/utils/ImageCropper.svelte';
	import {
		fetchImages,
		images,
		postImage,
		deleteImage,
		updateImage
	} from '../../../../store/image';
	import { onMount } from 'svelte';
	import Alert from '../../../../lib/utils/Alert.svelte';

	export let productId;

	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default
	const selectors = 'name';
	let text;
	let sorting;
	let isShowAlert = false;
	let loading = true;

	let rows = [];
	let rowsCount = 0;
	let typeAlert = '';
	let messageAlert = '';
	let selectId = 0;

	let showConfirm;
	let show;
	let methodType;
	let isUpload;
	let imageData = {
		id: 0,
		productId,
		url: '',
		updateImage: false,
		oldImage: ''
	};

	let filteredImage = { rows: [], count: 0 };

	$: {
		filteredImage = $images;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchImages({
			offset: _page * pageSize,
			limit: pageSize,
			selectors,
			keyword: text,
			...sorting
		});
		loading = true;
		rows = [...filteredImage.rows];
		rowsCount = filteredImage.count;
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
		await updateImage(imageData);
		show = false;
		await load();

		isUpload = false;
		showAlert('update Data has Successfully', 'success');
	};

	const handleDelete = async () => {
		await deleteImage(selectId);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const handlePost = async () => {
		isUpload = true;
		console.log(imageData);
		await postImage(imageData);
		show = false;
		await load();

		clearData(imageData);
		isUpload = false;

		showAlert('Added Data has Successfully', 'success');
	};

	let breadcrumb = [
		{
			name: 'Product',
			url: '/admin/product'
		},
		{
			name: 'Images',
			url: ''
		}
	];
</script>

<Confirm bind:showConfirm onDelete={() => handleDelete()} />
<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />

<div
	in:fly={{ x: 600 }}
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white"
>
	<div class="flex justify-between items-center mb-5 ">
		<h3 class="font-semibold text-lg text-gray-700">
			<a href="/admin/product">
				<i class="fas fa-arrow-left-long mr-3" />
			</a>
			Images
		</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Image"
			clear={() => clearData(imageData)}
			bind:methodType
			{isUpload}
			isValid={validate(imageData)}
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={imageData.name} disabled={isUpload} />
				<ImageCropper
					disabled={isUpload}
					bind:croppedImage={imageData.url}
					bind:status={imageData.updateImage}
				/>
			</div>
		</Modal>
	</div>
	<Breadcrumb data={breadcrumb} />
	<div class="grid grid-cols-5 mt-10 gap-5 justify-items-center ">
		{#if rows}
			{#if rows.length}
				{#each rows as row, index (row)}
					<ImageModal
						src={row.url}
						type="gallery"
						bind:showConfirm
						on:selectId={() => {
							selectId = row.id;
						}}
					/>
				{/each}
			{:else}
				<p class="text-center w-full">Image empty</p>
			{/if}
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
