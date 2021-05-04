import { Folder, File } from "../types";

const defaultFiles: File[] = [
  {
    id: "asdfwegadv2323fasd",
    title: "Checklist 1",
    order: 0,
    xml: `<ChecklistTitle>First Checklist</ChecklistTitle>
  
  <ChecklistItem><Item>SLAT/FLAP lever</Item><Action>
      In agreement with actual Slat/Flap position
    </Action>
  </ChecklistItem>
  
  <ChecklistItem ffod="true">
    <Item>PARK BRAKE</Item>
    <Action>ON</Action>
  </ChecklistItem>
  
  <ChecklistItem fullRow="true"><Item>Once DU 2 is Powered</Item></ChecklistItem>
  
  <ChecklistItem done="true">
    <Item>BATT 1</Item>
    <Action>AUTO</Action>
  </ChecklistItem>`,
  },
  {
    id: "asdfwesdas3",
    title: "Checklist 2",
    order: 1,
    xml: `<ChecklistTitle>Second Checklist</ChecklistTitle>
  
  <ChecklistItem><Item>SLAT/FLAP lever</Item><Action>
      In agreement with actual Slat/Flap position
    </Action>
  </ChecklistItem>
  
  
  
  <ChecklistItem done="true">
    <Item>BATT 1</Item>
    <Action>AUTO</Action>
  </ChecklistItem>}`,
  },
];

export const defaultDirectories: Folder[] = [
  {
    id: "0",
    open: false,
    title: "Checklists",
    order: 0,
    contents: {
      folders: [
        {
          id: "lkajsdlkfhhhwh23h",
          open: false,
          title: "Checklist 1",
          order: 0,
          contents: { folders: [], files: defaultFiles },
          editable: true,
        },
      ],
      files: [],
    },
    editable: false,
  },
  {
    id: "1",
    open: false,
    title: "Notes",
    order: 0,
    contents: { folders: [], files: [] },
    editable: false,
  },
  {
    id: "2",
    open: false,
    title: "Memory Items",
    order: 0,
    contents: { folders: [], files: [] },
    editable: false,
  },
];
