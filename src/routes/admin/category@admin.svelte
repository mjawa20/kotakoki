<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import {
		fetchCategories,
		categories,
		postCategory,
		deleteCategory,
		updateCategory
	} from '../../store/category';
	import Modal from '$lib/utils/Modal.svelte';
	import Input from '$lib/utils/Input.svelte';
	import Alert from '../../lib/utils/Alert.svelte';
	import Actions from '../../lib/dropdowns/Actions.svelte';
	import Confirm from '../../lib/utils/Confirm.svelte';
	import { clearData, validate } from '../../utils';

	let rows = [];
	let page = 0;
	let pageIndex = 0;
	let pageSize = 100;

	let loading = true;
	let rowsCount = 0;
	let text;
	let sorting;
	let show;
	const selectors = 'name';
	let isUpload = false;

	let category = {
		id: 0,
		name: ''
	};

	let typeAlert = '';
	let messageAlert = '';
	let isShowAlert = false;
	let methodType = '';
	let showConfirm = false;

	let filteredCategories = { rows: [], count: 0 };

	$: {
		filteredCategories = $categories;
	}

	onMount(async () => {
		await load(page);
	});

	async function load(_page) {
		await fetchCategories({
			offset: _page * pageSize,
			limit: pageSize,
			selectors,
			keyword: text,
			...sorting
		});
		loading = true;
		rows = [...filteredCategories.rows];
		rowsCount = filteredCategories.count;
		loading = false;
	}

	async function onCellClick(row) {
		alert(JSON.stringify(row));
		console.log(filteredCollections);
		await load();
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

		await postCategory(category);
		show = false;
		await load(page, 'created');

		isUpload = false;
		showAlert('Added Data has Successfully', 'success');
	};

	const handleDelete = async () => {
		await deleteCategory(category.id);
		await load();
		showAlert('Delete Data Successfully', 'success');
	};

	const handleUpdate = async () => {
		isUpload = true;

		await updateCategory(category);
		show = false;
		await load();

		isUpload = false;
		showAlert('update Data has Successfully', 'success');
	};

	const rowActions = [
		{
			name: 'Delete',
			function: async (selectedCategory) => {
				category = selectedCategory;
				showConfirm = true;
			}
		},
		{
			name: 'Update',
			function: (selectedCategory) => {
				show = true;
				methodType = 'update';
				category = { ...selectedCategory };
			}
		}
	];
</script>

<Alert type={typeAlert} show={isShowAlert} message={messageAlert} />
<Confirm bind:showConfirm onDelete={handleDelete} />

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Category</h3>
		<Modal
			on:submit={methodType === 'post' ? handlePost : handleUpdate}
			bind:show
			bind:methodType
			title="Category"
			clear={() => clearData(category)}
			{isUpload}
			isValid={validate(category)}
		>
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={category.name} disabled={isUpload} />
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
					Id
					<Sort key="id" on:sort={onSort} />
				</th>
				<th width="50%">
					Name
					<Sort key="name" on:sort={onSort} />
				</th>
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index}>
					<td data-label="Id">{row.id}</td>
					<td data-label="Name">{row.name}</td>
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
