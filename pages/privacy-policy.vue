<template>
<!--   <div>
    <Container
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      drag-handle-selector=".column-drag-handle"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
    >
      <Draggable v-for="column in scene.children" :key="column.id">
        <div :class="column.props.className">
          <div class="card-column-header">
            <span class="column-drag-handle">&#x2630;</span>
            {{ column.name }}
          </div>
          <Container
            group-name="col"
            @drop="(e) => onCardDrop(column.id, e)"
            @drag-start="(e) => log('drag start', e)"
            @drag-end="(e) => log('drag end', e)"
            :get-child-payload="getCardPayload(column.id)"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
          >
            <Draggable v-for="card in column.children" :key="card.id">
              <div :class="card.props.className" :style="card.props.style">
                <h3>Task # {{ card.number }}</h3>
                <p class="card-text">{{ card.data }}</p>
              </div>
            </Draggable>
          </Container>
        </div>
      </Draggable>
    </Container>
  </div> -->
  Privacy Policy
</template>

<script setup>
/* @ts-ignore */
import { Container, Draggable } from "vue-dndrop";

const lorem = `Lorem ipsum dolor sit amet, 
consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua.`;
const columnNames = ['Backlog', 'Doing', 'Finished'];

const cardColors = [
  '#34495E',
  '#84B0DC',
  '#49627A',
  '#41B883',
  '#7096BB',
  '#97CAFC',
  '#6CC1C0',
  '#41B883',
  '#41B883',
  '#49627A',
];

const pickColor = () => {
  const rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

const scene = ref(createScene());

const upperDropPlaceholderOptions = ref({
  className: "cards-drop-preview",
  animationDuration: "150",
  showOnTop: true
});

const dropPlaceholderOptions = ref({
  className: "drop-preview",
  animationDuration: "150",
  showOnTop: true
});

function onColumnDrop(dropResult) {
  const _scene = Object.assign({}, scene.value);
  _scene.children = applyDrag(_scene.children, dropResult);
  scene.value = _scene;
}

function onCardDrop(columnId, dropResult) {
  console.log(dropResult)
  if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
    const _scene = Object.assign({}, scene.value);
    const column = _scene.children.filter((p) => p.id === columnId)[0];
    const columnIndex = _scene.children.indexOf(column);

    const newColumn = Object.assign({}, column);
    newColumn.children = applyDrag(newColumn.children, dropResult);
    _scene.children.splice(columnIndex, 1, newColumn);

    scene.value = _scene;
  }
}

function getCardPayload(columnId) {
  const val = (index) => {
    return scene.value.children.filter((p) => p.id === columnId)[0].children[
      index
    ];
  };
  return val;
}

function dragStart() {
  console.log("drag started");
}

function log(...params) {
  console.log(...params);
}

/* vue-dndrop utilities */
function applyDrag(arr, dragResult) {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null)itemToAdd = result.splice(removedIndex, 1)[0];
  if (addedIndex !== null)result.splice(addedIndex, 0, itemToAdd);

  return result;
};
function generateItems(count, creator){
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }
  return result;
};

function createScene(){
  return {
    type: 'container',
    props: {
      orientation: 'horizontal',
    },
    children: generateItems(3, (i) => ({
      id: `column${i}`,
      type: 'container',
      name: columnNames[i],
      props: {
        orientation: 'vertical',
        className: 'card-container',
      },
      children: generateItems(+(Math.random() * 3).toFixed() + 1, (j) => ({
        type: 'draggable',
        id: `${i}${j}`,
        props: {
          className: 'card',
          style: { backgroundColor: pickColor() },
        },
        number: Math.floor(Math.random() * 100),
        data: lorem.slice(0, Math.floor(Math.random() * 150) + 30),
      })),
    }))
  }
};
</script>