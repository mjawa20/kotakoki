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
		deleteCollection
	} from '../../store/collection';
	import Modal from '$lib/utils/Modal.svelte';
	import Input from '$lib/utils/Input.svelte';
	import ImageCropper from '$lib/utils/ImageCropper.svelte';
	import ImageModal from '$lib/utils/ImageModal.svelte';
	import Actions from '../../lib/dropdowns/Actions.svelte';

	let rows = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let text;
	let sorting;
	let show;
	let nameValue = '';
	const selectors = 'name';

	let filteredCollections = { rows: [], count: 0 };

	let croppedImage;

	$: {
		filteredCollections = $collections;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCollections({ offset: _page * pageSize, limit: pageSize, selectors, keyword: text });
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

	const clear = () => {
		nameValue = '';
		croppedImage = null;
	};

	const handlePost = async () => {
		let newCollection = {
			name: nameValue,
			imageUrl: croppedImage
		};
		await postCollection(newCollection);
		show = false;
		await load();
	};

	const handleUpdate = async () => {};
	const handleDelete = async (id) => {
		await deleteCollection(id);
		await load();
	};

	const rowActions = [
		{
			name: 'Delete',
			function: async (id) => {
				// add confirmation dialog, delete when ok
				await handleDelete(id);
			}
		}
	];
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Collections</h3>
		<Modal on:submit={handlePost} bind:show title="Collection" {clear}>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={nameValue} />
				<ImageCropper bind:croppedImage />
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
						<Actions key={row.id} actions={rowActions} />
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
