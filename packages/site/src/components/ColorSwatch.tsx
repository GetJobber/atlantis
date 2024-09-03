import styles from "./ColorSwatch.module.css";

interface Color {
  readonly name: string;
  readonly value: string;
}

interface ColorGroup {
  [name: string]: Color[];
}

interface ColorDictionary {
  [color: string]: string;
}

interface ColorSwatchesProps {
  readonly colors: ColorDictionary;
}

interface ColorSwatchProps {
  readonly name: string;
  readonly value: string;
}


export function ColorSwatch({ name, value }: ColorSwatchProps) {
  return (
    <div className={styles.swatch}>
      <div
        className={styles.color}
        style={{
          backgroundColor: value,
        }}
      />
      <div className={styles.name}>{name}</div>
    </div>
  );
}


export function ColorSwatches({ colors }: ColorSwatchesProps) {
  const groupedColors = createColorGroups(colors);

  return Object.entries(groupedColors).map(([groupName, groupColors]) => (
    <div className={styles.swatchGroup} key={groupName}>
      <h3 className={styles.groupTitle}>{groupName}</h3>
      <div>
        {groupColors.map(({ name, value }) => (
          <ColorSwatch name={name} value={value} key={name} />
        ))}
      </div>
    </div>
  ));
}

function createColorGroups(colors: ColorDictionary): ColorGroup {
  return Object.entries(colors).reduce((colorGroups, [name, value]) => {
    const colorGroup = name.split("-")[3];
    (colorGroups as Record<string,string | never[]>)[colorGroup] = (colorGroups as Record<string,string | never[]>)[colorGroup] || [];
    ((colorGroups as Record<string,string | never[]>)[colorGroup] as Array<{name:string,value:string}>).push({ name, value });

    return colorGroups;
  }, {});
}
