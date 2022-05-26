<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import TableDropdown from '$lib/dropdowns/TableDropdown.svelte';
	import { fetchCollections, collections } from './../../store/collectionstore';
	import { fetchCategories, categories, postCategory } from './../../store/categorystore';
	import Modal from '$lib/utils/Modal.svelte';
	import Input from '$lib/utils/Input.svelte';

	let rows = [];
	let page = 0;
	let pageIndex = 0;
	let pageSize = 10;

	let loading = true;
	let rowsCount = 0;
	let text;
	let sorting;
	let show;
	let nameValue = '';

	let filteredCategories = [];

	$: {
		if (loading) {
			filteredCategories = [...$categories];
		}
	}

	onMount(async () => {
		filteredCategories = [...$categories];
		await load(page);
	});

	async function load(_page) {
		await fetchCategories();
		console.log(filteredCategories);
		loading = true;
		rows = filteredCategories;
		rowsCount = filteredCategories.length;
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

	const handlePost = async () => {
		let newCategory = {
			name: nameValue
		};
		postCategory(newCategory);
		show = false;
		await load(page);
	};
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<div class="flex justify-between items-center mb-5">
		<h3 class="font-semibold text-lg text-gray-700">Category</h3>
		<Modal on:submit={handlePost} bind:show title="Category">
			<div class="px-5">
				<Input type="text" placeholder="Name" bind:value={nameValue} />
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
					<Sort key="name" on:sort={onSort} />
				</th>
				<th width="50%"> Name </th>
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index} on:click={() => onCellClick(row)}>
					<td data-label="Id">{row.id}</td>
					<td data-label="Name">{row.name}</td>
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
