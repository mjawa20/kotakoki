<script>
	export let name;
	export let title;
	export let options;
	export let value;
</script>

<div class={name ? 'flex items-center' : 'w-full mb-2'}>
	{#if name}
		<p class="text-sm mr-2">{name}</p>
	{/if}
	<select
		bind:value={value}
		class="{name
			? 'text-center'
			: ''} border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
	>
		<option selected value={null}>{title}</option>
		{#if options}
			{#each options as option}
				<option value={option.id}>{option.name}</option>
			{/each}
		{/if}
	</select>
</div>
