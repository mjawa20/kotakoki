<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import TableDropdown from '$lib/dropdowns/TableDropdown.svelte';
	import Modal from '../../lib/utils/Modal.svelte';
	import {
		products,
		fetchProduct,
		postProduct,
		deleteProduct,
		updateProduct
	} from '../../store/product';
	import Input from '../../lib/utils/Input.svelte';
	import SelectItem from '../../lib/utils/SelectItem.svelte';
	import { collections, fetchCollections } from '../../store/collection';
	import { categories, fetchCategories } from '../../store/category';
	import Alert from '../../lib/utils/Alert.svelte';
	import Actions from '../../lib/dropdowns/Actions.svelte';
	import Confirm from '../../lib/utils/Confirm.svelte';

	let rows = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 10; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let filteredProducts = [];

	let typeAlert = '';
	let messageAlert = '';
	let isShowAlert = false;

	let confirm = false;
	let showConfirm = false;

	let methodType = '';
	let product = {
		id: '',
		name: '',
		price: '',
		description: '',
		collectionId: null,
		categoryId: null
	};

	$: show = false;

	$: {
		filteredProducts = $products;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCollections();
		await fetchCategories();
		await fetchProduct();
		loading = true;
		rows = [...filteredProducts.rows];
		rowsCount = filteredProducts.count;
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

	const clear = () => {
		nameValue = '';
		priceValue = '';
		descValue = '';
		collectionId = null;
		categoryId = null;
	};

	const handlePost = async () => {
		await postProduct(product);
		show = false;

		await load();
		clear();

		showAlert('Added Data has Successfully', 'success');
	};

	const handleDelete = async (id) => {
		await deleteProduct(id);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const handleUpdate = async (id) => {
		await updateProduct(product);
		show = false;
		await load();

		showAlert('update Data has Successfully', 'success');
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
			function: async (selectedProduct) => {
				methodType = 'update';
				product = { ...selectedProduct };
				show = true;
				console.log(product);
			}
		}
	];
</script>

<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<Confirm bind:showConfirm bind:confirm />
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Products</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Product"
			{clear}
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={product.name} />
				<input
					placeholder="Price"
					type="number"
					class="mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={product.price}
				/>
				<textarea
					placeholder="Description"
					class="mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={product.description}
				/>
				<div class="inline-flex justify-between w-full gap-3 ">
					<SelectItem
						options={$collections.rows}
						title="Collection"
						bind:value={product.collectionId}
					/>
					<SelectItem options={$categories.rows} title="Category" bind:value={product.categoryId} />
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
					<td data-label="Category">
						{row.categoryId ? $categories?.rows.find((x) => x.id === row.categoryId).name : '-'}
					</td>
					<td data-label="Collection"
						>{row.collectionId
							? $collections?.rows.find((x) => x.id === row.collectionId).name
							: '-'}</td
					>
					<td>
						<Actions data={row} actions={rowActions} />
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
