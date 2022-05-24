<script>
	import '../app.css';
	import Summary from '$lib/checkout/Summary.svelte';
</script>

<div class="min-h-screen flex flex-col lg:flex-row text-zinc-700">
	<slot />
	<Summary />
</div>
