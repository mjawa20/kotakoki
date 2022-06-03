<script context="module">
	export async function load({session}) {
		return {
			props: {
				authenticated: session.authenticated,
				name: session.name,
				email: session.email
			}
		};
	}
</script>

<script>
	import '../app.css';
	import Footer from '$lib/home/Footer.svelte';
	import Header from '$lib/home/Header.svelte';
	import Nav from '$lib/navigasi/Nav.svelte';

	export let authenticated;
	export let name;
	export let email;
</script>

<h1>{name} {email}</h1>
<Nav {authenticated} />
<div class="mx-auto max-w-5xl  px-7">
	<Header />
	<slot />
	<Footer />
</div>
