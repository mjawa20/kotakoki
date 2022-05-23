<script>
	export let name;
	export let option;
</script>

<div class={name ? 'flex items-center' : 'w-full mb-2'}>
	{#if name}
		<p class="text-sm mr-2">{name}</p>
	{/if}
	<select
		class="{name ? 'text-center' : ''} border border-gray-300 text-xs font-bold px-2 py-2 w-full rounded-md"
	>
		<option selected>{option}</option>
		<option value="1">One</option>
		<option value="2">Two</option>
		<option value="3">Three</option>
	</select>
</div>
