<script>
	export let name;
	export let id;
	export let imageUrl;
	export let createdAt;
	export let updatedAt;
</script>

<a href="/collections/{id}" class="text-center">
	<img src="/assets/img/download.jpg" alt="" class="w-full hover:opacity-70" />
	<p class="text-amber-900 text-xs font-bold mt-3">{name}</p>
</a>
