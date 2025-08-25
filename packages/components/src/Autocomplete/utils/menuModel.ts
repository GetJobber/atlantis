import type React from "react";
import type {
  ActionConfig,
  MenuItem,
  MenuOptions,
  MenuPersistent,
  MenuSection,
  OptionLike,
} from "../Autocomplete.types";
import type { RenderItem } from "../useAutocomplete";

export function flattenMenu<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(menu: MenuItem<Value, S, A>[]) {
  const optionItems: Value[] = [];
  const sections: Array<MenuSection<Value, S, A> | MenuOptions<Value, A>> = [];
  const persistentsHeaders: MenuPersistent<A>[] = [];
  const persistentsFooters: MenuPersistent<A>[] = [];

  menu.forEach(item => {
    if (item.type === "persistent") {
      (item.position === "header"
        ? persistentsHeaders
        : persistentsFooters
      ).push(item);

      return;
    }

    const group = item;

    sections.push(group);
    optionItems.push(...group.options);
  });

  return { optionItems, sections, persistentsHeaders, persistentsFooters };
}

export function buildItemsForGroup<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  group: MenuSection<Value, S, A> | MenuOptions<Value, A>,
  optionsTransform?: (opts: Value[]) => Value[],
): Array<RenderItem<Value, S, A>> {
  const isSection = group.type === "section";
  const filtered = optionsTransform
    ? optionsTransform(group.options)
    : group.options;
  const actions = group.actionsBottom ?? [];
  const result: Array<RenderItem<Value, S, A>> = [];
  const sectionHasContent =
    isSection && (filtered.length > 0 || actions.length > 0);

  if (sectionHasContent) {
    result.push({
      kind: "section",
      section: group,
    });
  }

  if (filtered.length > 0) {
    result.push(
      ...filtered.map<RenderItem<Value, S, A>>(o => ({
        kind: "option",
        value: o,
      })),
    );
  }

  if (actions.length > 0) {
    result.push(
      ...actions.map<RenderItem<Value, S, A>>(action => ({
        kind: "action",
        action,
        origin: "menu",
      })),
    );
  }

  return result;
}

export function buildRenderableList<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  sections: Array<MenuSection<Value, S, A> | MenuOptions<Value, A>>,
  optionsTransform?: (opts: Value[]) => Value[],
) {
  const items: Array<RenderItem<Value, S, A>> = [];

  for (const group of sections) {
    items.push(...buildItemsForGroup<Value, S, A>(group, optionsTransform));
  }

  return items;
}

export function getNavigableItemAtIndex<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  activeIndex: number | null,
  renderable: Array<RenderItem<Value, S, A>>,
): RenderItem<Value, S, A> | null {
  if (activeIndex == null) return null;

  let navigableIndex = -1;

  for (const item of renderable) {
    // Ignore sections
    if (item.kind === "section") continue;

    navigableIndex += 1;

    if (navigableIndex === activeIndex) return item;
  }

  return null;
}

export function findNavigableIndexForValue<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  renderable: Array<RenderItem<Value, S, A>>,
  equals: (a: Value, b: Value) => boolean,
  selectedValue: Value,
): number | null {
  let navigableIndex = -1;

  for (const item of renderable) {
    // Ignore sections
    if (item.kind === "section") continue;

    navigableIndex += 1;

    if (item.kind === "option" && equals(item.value, selectedValue)) {
      return navigableIndex;
    }
  }

  return null;
}

export function invokeActiveItemOnEnter<
  Value extends OptionLike,
  S extends object,
  A extends object,
>(
  event: React.KeyboardEvent,
  activeIndex: number | null,
  renderable: Array<RenderItem<Value, S, A>>,
  onSelect: (option: Value) => void,
  onAction: (action: ActionConfig) => void,
): void {
  const activeItem = getNavigableItemAtIndex<Value, S, A>(
    activeIndex,
    renderable,
  );

  if (!activeItem) return;

  event.preventDefault();

  if (activeItem.kind === "option") {
    onSelect(activeItem.value);
  } else if (activeItem.kind === "action") {
    onAction({
      run: activeItem.action.onClick,
      closeOnRun: activeItem.action.shouldClose,
    });
  }
}
