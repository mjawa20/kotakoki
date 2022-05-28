<script>
	export let color = 'text-amber-900';
	export let data;
</script>

<p class="text-xs {color} font-semibold">
	{#each data as data}
		{#if data.url}
			<a href={data.url}>{data.name}</a>
			<span class="font-bold mx-2">></span>
		{:else}
			{data.name}
		{/if}
	{/each}
</p>
