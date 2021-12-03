<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Hide from '$lib/components/Hide.svelte';
import { Col, Container, Row, TabContent, TabPane } from 'sveltestrap';
</script>

<svelte:head>
	<title>Secret Share - NoTrack : For a private, ad and tracking free web</title>
</svelte:head>

<Container>
	<Row>
		<Col>
			<h1 class="pt-3 pb-2">Hide your secret !</h1>
			<p>
				This tool is used to hide your secret from everyone, and because it's part of the "No-Track Project", nothing is stored and your are not traced in any way.
			</p>
		</Col>
	</Row>
	
	
	<TabContent>
		<TabPane tabId="hide" tab="Hide your secret" active>
			<Hide />
		</TabPane>
		<TabPane tabId="reveal" tab="Reveal your secret">
		</TabPane>
	</TabContent>
	
</Container>
