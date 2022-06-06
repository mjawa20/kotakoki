<script>
	import '../app.css';
	import Footer from '$lib/home/Footer.svelte';
	import Header from '$lib/home/Header.svelte';
	import Nav from '$lib/navigasi/Nav.svelte';
	import { session } from '$app/stores';
</script>

<h1>{$session?.name} {$session?.email}</h1>
<Nav authenticated={$session?.authenticated} />
<div class="mx-auto max-w-5xl  px-7">
	<Header />
	<slot />
	<Footer />
</div>
