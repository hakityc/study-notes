<script setup>
import { ref } from 'vue'
import LinkCardListTree from "@/components/linkCard/LinkCardListTree.vue"
import tree from '@/static/NavigationCards.mts'

</script>

# 导航

<LinkCardListTree :tree="tree" :depth="1"></LinkCardListTree>
