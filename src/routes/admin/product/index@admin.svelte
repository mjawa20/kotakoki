<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import Modal from '$lib/utils/Modal.svelte';
	import {
		products,
		fetchProduct,
		postProduct,
		deleteProduct,
		updateProduct,
		fetchProducts
	} from '../../../store/product';
	import Input from '$lib/utils/Input.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
	import { collections, fetchCollections } from '../../../store/collection';
	import { categories, fetchCategories } from '../../../store/category';
	import Alert from '$lib/utils/Alert.svelte';
	import Actions from '$lib/dropdowns/Actions.svelte';
	import Confirm from '$lib/utils/Confirm.svelte';
	import { clearData, validate } from '../../../utils';
	import DetailModal from '../../../lib/utils/DetailModal.svelte';
	import { fetchImages, images } from '../../../store/image';

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
	let isUpload = false;
	let text;
	let sorting;
	const selectors = 'name';
	const excludes = ['category', 'images', 'collection'];

	let methodType = '';
	let product = {
		id: '',
		name: '',
		price: '',
		description: '',
		collectionId: null,
		categoryId: null
	};

	let show = false;
	let showDetail = false;
	let isValid = false;

	onMount(async () => {
		await fetchImages();
		await fetchCollections();
		await fetchCategories();
		await load(page);
	});

	async function load(_page) {
		await fetchProducts({
			offset: _page * pageSize,
			limit: pageSize,
			selectors,
			keyword: text,
			...sorting
		});
		loading = true;
		rows = [...filteredProducts.rows];
		rowsCount = filteredProducts.count;
		loading = false;
	}

	$: {
		filteredProducts = $products;
		isValid = validate(product, excludes);
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

	const showAlert = (message, type) => {
		isShowAlert = true;
		messageAlert = message;
		typeAlert = type;

		setTimeout(() => {
			isShowAlert = false;
		}, 3000);
	};

	const handlePost = async () => {
		isUpload = true;
		await postProduct(product);
		show = false;

		await load();
		isUpload = false;

		showAlert('Added Data has Successfully', 'success');
	};

	const handleDelete = async () => {
		await deleteProduct(product.id);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const handleUpdate = async (id) => {
		isUpload = true;
		await updateProduct(product);
		show = false;
		await load();
		isUpload = false;

		showAlert('update Data has Successfully', 'success');
	};

	const rowActions = [
		{
			name: 'Delete',
			function: async (selectedProduct) => {
				product = selectedProduct;
				showConfirm = true;
			}
		},
		{
			name: 'Update',
			function: async (selectedProduct) => {
				methodType = 'update';
				product = { ...selectedProduct };
				show = true;
			}
		},
		{
			name: 'Detail',
			function: async (selectedProduct) => {
				showDetail = true;
				product = { ...selectedProduct };
			}
		}
	];
	$: {
		console.log($images);
	}
</script>

<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<Confirm bind:showConfirm onDelete={handleDelete} />
<DetailModal bind:showDetail row={product} clear={() => clearData(product, excludes)} />
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Products</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			title="Product"
			clear={() => {
				clearData(product, excludes);
			}}
			bind:methodType
			{isUpload}
			{isValid}
			on:validate={() => (isValid = validate(product, excludes))}
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={product.name} disabled={isUpload} />
				<input
					disabled={isUpload}
					placeholder="Price"
					type="number"
					class="disabled:bg-slate-100 mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={product.price}
				/>
				<textarea
					disabled={isUpload}
					placeholder="Description"
					class="disabled:bg-slate-100 mb-5 mt-1 px-3 py-2 bg-white border border-slate-300 block w-full rounded-md sm:text-sm "
					bind:value={product.description}
				/>
				<div class="inline-flex justify-between w-full gap-3 ">
					<SelectItem
						disabled={isUpload}
						options={$collections.rows}
						title="Collection"
						bind:value={product.collectionId}
					/>
					<SelectItem
						disabled={isUpload}
						options={$categories.rows}
						title="Category"
						bind:value={product.categoryId}
					/>
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
				<th width="20%">
					Name
					<Sort key="name" on:sort={onSort} />
				</th>
				<th width="18%">
					Price
					<Sort key="price" on:sort={onSort} />
				</th>
				<th width="15%">
					Category
					<Sort key="category.name" on:sort={onSort} />
				</th>
				<th width="15%">
					Collection
					<Sort key="collection.name" on:sort={onSort} />
				</th>
				<th width="25%"> Images </th>
				<th width="7%" />
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index}>
					<td data-label="Name">{row.name}</td>
					<td data-label="Price">{row.price}</td>
					<td data-label="Category">
						{row.categoryId ? $categories?.rows.find((x) => x.id === row.categoryId).name : '-'}
					</td>
					<td data-label="Collection">
						{row.collectionId
							? $collections?.rows.find((x) => x.id === row.collectionId).name
							: '-'}
					</td>
					<td data-label="Images">
						{#if $images.rows.filter((item) => item.productId === row.id).length}
							<a href="/admin/product/{row.id}/images">
								<div class="inline-flex -space-x-3 ">
									{#each $images.rows.filter((item) => item.productId === row.id) as image}
										<img
											src={image.url}
											alt=""
											class="rounded-full w-9 h-9 border-slate-400 border shadow-lg"
										/>
									{/each}
								</div>
							</a>
						{:else}
							<a
								href="/admin/product/{row.id}/images"
								class="bg-blue-500 px-3 py-1 text-xs ml-3 text-white rounded active:bg-blue-800 active:shadow-lg hover:bg-blue-500 hover:shadow-lg"
								>Add image</a
							>
						{/if}
					</td>
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
