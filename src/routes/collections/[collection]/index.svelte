<script>
	import Breadcrumb from '$lib/utils/Breadcrumb.svelte';
	import CollectionItem from '$lib/collection/CollectionItem.svelte';
	import SelectItem from '$lib/utils/SelectItem.svelte';
</script>

<div class="mt-10">
	<Breadcrumb />
	<div class="flex justify-between items-center  my-7 ">
		<h1 class="font-bold text-2xl text-amber-900">Spice Blend</h1>
		<div class="flex  gap-4">
			<SelectItem name="Browse" />
			<SelectItem name="Sort" />
		</div>
	</div>
	<div class="grid md:grid-cols-4 grid-cols-2 gap-6">
		<CollectionItem />
		<CollectionItem />
		<CollectionItem />
		<CollectionItem />
	</div>
</div>
