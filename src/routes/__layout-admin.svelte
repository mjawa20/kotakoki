<script>
	import '../app.css'
	import Dashboard from '$lib/Dashboard.svelte';
	import FooterAdmin from '$lib/footers/FooterAdmin.svelte';
	import HeaderStats from '$lib/headers/HeaderStats.svelte';
	import AdminNavbar from '$lib/navbars/AdminNavbar.svelte';
	import Sidebar from '$lib/sidebar/Sidebar.svelte';

	// components for this layout
</script>

<div>
	<Sidebar />
	<div class="relative md:ml-64 bg-gray-100 h-screen justify-between">
    <AdminNavbar />
		<HeaderStats />
		<div class="px-4 md:px-10 mx-auto w-full mt-10">
			<slot><!-- optional fallback --></slot>
		</div>
		<FooterAdmin class=""/>
	</div>
</div>