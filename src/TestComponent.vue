<template>
  <div class="custom-radio">
    <h3>動態自訂 Radio（可取消選取、無間距）</h3>

    <div class="custom-radio__group">
      <div
        v-for="option in options"
        :key="option.value"
        class="custom-radio__item"
        :class="{ 'custom-radio__item--selected': selected === option.value }"
        @click="toggle(option.value)"
      >
        {{ option.label }}
      </div>
    </div>

    <p>目前選取: {{ selected || '無' }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { label: "蘋果", value: "apple" },
        { label: "香蕉", value: "banana" },
        { label: "橘子", value: "orange" },
        { label: "葡萄", value: "grape" }
      ]
    };
  },
  methods: {
    toggle(value) {
      // 點擊已選中 → 取消選取
      this.selected = this.selected === value ? null : value;
    }
  }
};
</script>

<style scoped>
.custom-radio__group {
  display: flex;
  flex-wrap: wrap;  /* 若太多可換行 */
  gap: 0;           /* 移除間距 */
}

.custom-radio__item {
  padding: 4px 16px;
  border: 1px solid #ccc;
  border-radius: 0;        /* 無圓角，緊貼 */
  cursor: pointer;
  user-select: none;
  transition: all 0.2s;
}

/* 選中狀態 */
.custom-radio__item--selected {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
  z-index: 1;               /* 避免邊框重疊被遮住 */
}

/* 可選：讓按鈕緊貼時消除重疊邊框 */
.custom-radio__item + .custom-radio__item {
  border-left: none;       /* 只保留第一個左邊框 */
}
.custom-radio__item:first-child {
  border-left: 1px solid #ccc;
}
</style>
