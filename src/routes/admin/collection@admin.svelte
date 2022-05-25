<script>
	//Row component is optional and only serves to render odd/even row, you can use <tr> instead.
	//Sort component is optional
	import { onMount } from 'svelte';
	import Table, { Pagination, Row, Search, Sort } from '$lib/table/Table.svelte';
	import { sortNumber, sortString } from '$lib/table/sorting';
	import TableDropdown from '$lib/dropdowns/TableDropdown.svelte';
	import { fetchCollections, collections } from "./../../store/collectionstore";

	let rows = [];
	let page = 0; //first page
	let pageIndex = 0; //first row
	let pageSize = 3; //optional, 10 by default

	let loading = true;
	let rowsCount = 0;
	let text;
	let sorting;

	let filteredCollections = [];

	$: {
		if (false) {
			// filteredCollections = $collections.filter((collection) => collection.name.toLowerCase().includes(searchTerm.toLowerCase()));
		} else {
			filteredCollections = [...$collections];
		}
	}
	
	onMount(async () => {
		filteredCollections = [...$collections];
		await load(page);
	});
	
	async function load(_page) {
		await fetchCollections()
		console.log('==================================================');
		console.log(filteredCollections);
		loading = true;
		rows = filteredCollections;
		rowsCount = filteredCollections.length;
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
</script>

<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded p-10 bg-white">
	<h3 class="font-semibold text-lg text-gray-700">Card Tables</h3>
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
				<th width="50%">
					Image
				</th>
			</tr>
		</thead>
		<tbody>
			{#each rows2 as row, index (row)}
				<Row {index} on:click={() => onCellClick(row)}>
					<td data-label="Name">{row.name}</td>
					<td data-label="Image">{row.imageUrl}</td>
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
