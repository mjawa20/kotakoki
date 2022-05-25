<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { getData } from '$lib/table/server.js';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import TableDropdown from '$lib/dropdowns/TableDropdown.svelte';
	import Modal from '../../lib/utils/Modal.svelte';
	import { product, fetchProduct, postProduct } from '../../store/productstore';
	import Input from '../../lib/utils/Input.svelte';
	import SelectItem from '../../lib/utils/SelectItem.svelte';
	import { collections, fetchCollections } from '../../store/collectionstore';

	let rows = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let filteredProducts = [];
	let nameValue = '';
	let priceValue;
	let descValue = '';
	let collectionId;
	$: show = false;

	$: {
		filteredProducts = [...$product];
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCollections();
		await fetchProduct();
		loading = true;
		rows = filteredProducts;
		rowsCount = filteredProducts.length;
		loading = false;
	}

	function onCellClick(row) {
		alert(JSON.stringify(row));
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

	const handlePost = () => {
		let newProduct = {
			name: nameValue,
			price: priceValue,
			description: descValue,
			collectionId: collectionId
		};
		postProduct(newProduct);
		show = false;
	};
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Products</h3>
		<Modal on:submit={handlePost} bind:show>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={nameValue} />
				<input
					placeholder="Price"
					type="number"
					class="mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={priceValue}
				/>
				<textarea
					placeholder="Description"
					class="mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={descValue}
				/>
				<div class="inline-flex justify-between w-full gap-3 ">
					<SelectItem options={$collections} title="Collection" bind:value={collectionId} />
					<SelectItem title="Category" />
				</div>
			</div>
		</Modal>
	</div>
	<Table {loading} {rows} {pageIndex} {pageSize} let:rows={rows2}>
		<div slot="top" class="mb-8">
			<Search on:search={onSearch} />
		</div>
		<thead slot="head">
			<tr>
				<th width="8%">
					Id
					<Sort key="name" on:sort={onSort} />
				</th>
				<th width="20%">
					Name
					<Sort key="name" on:sort={onSort} />
				</th>
				<th width="20%">
					Price
					<Sort key="lastName" on:sort={onSort} />
				</th>
				<th width="25%">
					Description
					<Sort key="age" on:sort={onSort} />
				</th>
				<th width="12%">
					Category
					<Sort key="age" on:sort={onSort} />
				</th>
				<th width="12%">
					Collection
					<Sort key="age" on:sort={onSort} />
				</th>
				<th width="3%" />
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index}>
					<td data-label="Id">{row.id}</td>
					<td data-label="Name">{row.name}</td>
					<td data-label="Age">{row.price}</td>
					<td data-label="Description">{row.description}</td>
					<td data-label="Category">{row.category}</td>
					<td data-label="Collection">{row.collection}</td>
					<td>
						<TableDropdown />
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
