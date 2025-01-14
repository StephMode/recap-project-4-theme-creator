import { useState } from "react";

export default function ThemeManager({
  themes,
  seletedThemeId,
  onThemeSelect,
  onAddTheme,
  onDeleteTheme,
  onEditTheme,
}) {
  const selectedTheme = themes.find((t) => t.id === seletedThemeId);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onEditTheme(editName);
    setIsEditing(false);
  }

  return (
    <>
      <div style={{ display: "flex", gap: "15px" }}>
        {!isEditing && (
          <select
            value={seletedThemeId}
            onChange={(e) => onThemeSelect(e.target.value)}
          >
            {themes.map((theme) => {
              return (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              );
            })}
          </select>
        )}

        {!isEditing && (
          <>
            {selectedTheme.id === "t1" && (
              <button
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  color: "#46453D",
                }}
              >
                Edit
              </button>
            )}
            {selectedTheme.id !== "t1" && (
              <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
          </>
        )}

        {isEditing && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={editName}
              placeholder={selectedTheme?.name || "enter a name"}
              onChange={(e) => setEditName(e.target.value)}
            ></input>
            <button type="submit">✏️</button>
            <button onClick={() => setIsEditing(false)}>cancel</button>
          </form>
        )}

        {!isEditing && (
          <>
            {selectedTheme.id !== "t1" && (
              <button onClick={() => onDeleteTheme(seletedThemeId)}>
                Delete
              </button>
            )}
            {selectedTheme.id === "t1" && (
              <button
                style={{
                  backgroundColor: "#FAFAFA",
                  border: "1px solid lightgrey",
                  borderRadius: "5px",
                  color: "#46453D",
                }}
              >
                Delete
              </button>
            )}
          </>
        )}
      </div>
      <button onClick={onAddTheme}>Add</button>
    </>
  );
}
