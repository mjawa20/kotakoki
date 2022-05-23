<script>
	import '../app.css';
	import Footer from '$lib/home/Footer.svelte';
	import Header from '$lib/home/Header.svelte';
	import Nav from '$lib/navigasi/Nav.svelte';
</script>

<Nav />
<div class="mx-auto max-w-4xl  px-7">
	<Header />
	<slot />
	<Footer />
</div>