<script context="module">
	export async function load(event ) {
		// console.log(event.request);
		console.log('=============');
		return { props:  'asd'  };
	}
</script>

<script>
	import '../app.css';
	import Footer from '$lib/home/Footer.svelte';
	import Header from '$lib/home/Header.svelte';
	import Nav from '$lib/navigasi/Nav.svelte';
</script>

<Nav />
<div class="mx-auto max-w-5xl  px-7">
	<Header />
	<slot />
	<Footer />
</div>
