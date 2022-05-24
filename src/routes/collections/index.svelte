<script>
	import { collection } from '../../store/collectionstore';
	import CollectionItem from '$lib/collection/CollectionItem.svelte';
	import CollectionsListSkel from '../../lib/skeleton/CollectionsListSkel.svelte';
</script>

<div class="mt-10">
	<h1 class="font-bold text-2xl text-amber-900 mb-5">Collection list</h1>
	{#if $collection.length}
		<div class="grid md:grid-cols-4 grid-cols-2 justify-between gap-6">
			{#each $collection as collection}
				<CollectionItem {collection} />
			{/each}
		</div>
	{:else}
		<CollectionsListSkel />
	{/if}
</div>
