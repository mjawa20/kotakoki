<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import {
		fetchCollections,
		collections,
		postCollection,
		deleteCollection,
		updateCollection
	} from '../../store/collection';
	import Modal from '$lib/utils/Modal.svelte';
	import Input from '$lib/utils/Input.svelte';
	import ImageCropper from '$lib/utils/ImageCropper.svelte';
	import ImageModal from '$lib/utils/ImageModal.svelte';
	import Actions from '../../lib/dropdowns/Actions.svelte';
	import Alert from '../../lib/utils/Alert.svelte';
	import { clearData } from '../../utils';
	import Confirm from '../../lib/utils/Confirm.svelte';

	let rows = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let text;
	let sorting;
	let show;
	const selectors = 'name';
	let confirm = false;
	let showConfirm = false;

	let typeAlert = '';
	let messageAlert = '';
	let isShowAlert = false;

	let methodType = '';

	let filteredCollections = { rows: [], count: 0 };

	let collection = {
		id: 0,
		name: '',
		imageUrl: '',
		updateImage: false,
		oldImage: ''
	};

	$: {
		filteredCollections = $collections;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCollections({ offset: _page * pageSize, limit: pageSize, selectors, keyword: text, ...sorting });
		loading = true;
		rows = [...filteredCollections.rows];
		rowsCount = filteredCollections.count;
		loading = false;
	}

	async function onCellClick(row) {
		alert(JSON.stringify(row));
		console.log(filteredCollections);
	}

	function onPageChange(event) {
		load(event.detail.page);
		page = event.detail.page;
	}

	async function onSearch(event) {
		text = event.detail.text;
		await load(page);
		page = 0;
	}

	async function onSort(event) {
		sorting = { dir: event.detail.dir, key: event.detail.key };
		await load(page);
	}

	const showAlert = (message, type) => {
		isShowAlert = true;
		messageAlert = message;
		typeAlert = type;

		setTimeout(() => {
			isShowAlert = false;
		}, 3000);
	};

	const handlePost = async () => {
		await postCollection(collection);
		show = false;
		await load();

		showAlert('Added Data has Successfully', 'success');
	};

	const handleUpdate = async (id) => {
		await updateCollection(collection);
		show = false;
		await load();

		showAlert('update Data has Successfully', 'success');
	};

	const handleDelete = async (id) => {
		await deleteCollection(id);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const rowActions = [
		{
			name: 'Delete',
			function: async (id) => {
				showConfirm = true;
				if(confirm) await handleDelete(id);
			}
		},
		{
			name: 'Update',
			function: (selectedCollection) => {
				methodType = 'update';
				collection = { ...selectedCollection, oldImage: selectedCollection.imageUrl };
				show = true;
			}
		}
	];

	$: console.log(methodType);
</script>

<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<Confirm bind:showConfirm bind:confirm />

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Collections</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Collection"
			clear={() => clearData(collection)}
			bind:methodType
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={collection.name} />
				<ImageCropper
					bind:croppedImage={collection.imageUrl}
					bind:status={collection.updateImage}
				/>
			</div>
		</Modal>
	</div>
	<Table {loading} {rows} {pageIndex} {pageSize} let:rows={rows2}>
		<div slot="top" class="mb-8">
			<Search on:search={onSearch} />
		</div>
		<thead slot="head">
			<tr>
				<th width="50%">
					Name
					<Sort key="name" on:sort={onSort} />
				</th>
				<th width="50%"> Image </th>
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index}>
					<td data-label="Name">{row.name}</td>
					<td data-label="Image">
						<ImageModal src={row.imageUrl} />
					</td>
					<td>
						<Actions key={row} actions={rowActions} />
					</td>
				</Row>
			{/each}
		</tbody>
		<div slot="bottom" class="mt-8">
			<Pagination
				{page}
				{pageSize}
				count={rowsCount}
				serverSide={true}
				on:pageChange={onPageChange}
			/>
		</div>
	</Table>
</div>
