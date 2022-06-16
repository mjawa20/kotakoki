<script>
	export let name;
	export let title;
	export let options;
	export let value;
	export let disabled = false;
</script>

<div class={name ? 'flex items-center' : 'w-full mb-2'}>
	{#if name}
		<p class="text-sm mr-2">{name}</p>
	{/if}
	<select
		{disabled}
		bind:value
		class="
		disabled:bg-slate-100
		{name ? 'text-center' : ''} border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
	>
		<option selected value={null}>{title}</option>
		{#if options}
			{#each options as option}
				<option value={option.id} >{option.name ? option.name : option.nama}</option>
			{/each}
		{/if}
	</select>
</div>
