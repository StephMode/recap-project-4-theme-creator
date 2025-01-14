import "./App.css";
import { initialThemes } from "./lib/themes";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";
import ThemeManager from "./Components/ThemeManager/ThemeManager";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [selectedThemeId, setSelectedThemeId] = useState(initialThemes[0].id);
  const selectedTheme = themes.find((t) => t.id === selectedThemeId);

  function handleAddTheme() {
    setThemes([...themes, { id: uid(), name: "new Theme", colors: [] }]);
  }

  function handleDeleteTheme(themeId) {
    setThemes((prevThemes) => prevThemes.filter((t) => t.id !== themeId));
    setSelectedThemeId(initialThemes[0].id);
  }

  function handleEditTheme(newName) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId ? { ...theme, name: newName } : theme
      )
    );
  }

  function handleAddColor(newColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: [{ id: uid(), ...newColor }, ...theme.colors],
            }
          : theme
      )
    );
  }

  function handleDeleteColor(id) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: theme.colors.filter((color) => color.id !== id),
            }
          : theme
      )
    );
  }

  function handleEditColor(editedColor) {
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedTheme.id
          ? {
              ...theme,
              colors: theme.colors.map((color) => {
                return color.id === editedColor.id ? editedColor : color;
              }),
            }
          : theme
      )
    );
  }

  return (
    <main>
      <h1>Theme Creator</h1>

      <ThemeManager
        themes={themes}
        seletedThemeId={selectedTheme.id}
        onThemeSelect={setSelectedThemeId}
        onAddTheme={handleAddTheme}
        onDeleteTheme={handleDeleteTheme}
        onEditTheme={handleEditTheme}
      />

      <h2>{selectedTheme.name}</h2>

      <ColorForm onAddColor={handleAddColor} />

      {selectedTheme.colors.length === 0 && (
        <h3 className="no-colors-message">
          🎨 No colors? How about adding one?
        </h3>
      )}

      <ul className="color-card--list">
        {selectedTheme.colors.map((color) => {
          return (
            <li key={color.id}>
              <Color
                className="color-card--item"
                color={color}
                onDeleteColor={handleDeleteColor}
                onEditColor={handleEditColor}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
