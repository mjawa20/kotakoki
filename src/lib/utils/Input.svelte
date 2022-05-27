<script>
	export let name;
	export let placeholder;
	export let style = 'mb-5';
	export let value;
	export let disabled;
	let err = false;

	const validate = () => {
		if (!value) {
			err = true;
		} else {
			err = false;
		}
	};
</script>

<label class="block w-full {style}">
	{#if name}
		<span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium">
			{name}
		</span>
	{/if}
	<input
		on:input={validate}
		on:blur={validate}
		bind:value
		type="text"
		class="disabled:bg-slate-100 mt-1 px-3 py-2 bg-white border  {err
			? 'border-red-600 text-red-600 placeholder:text-red-600'
			: 'border-slate-300'} block w-full rounded-md sm:text-sm "
		placeholder={placeholder ? placeholder : ''}
		{disabled}
	/>
	{#if err}
		<p class="text-xs text-red-600 mt-1">This field Must filled</p>
	{/if}
</label>
