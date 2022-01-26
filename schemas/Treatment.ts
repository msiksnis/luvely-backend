import { integer, select, text, relationship } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { rules, isSignedIn } from "../access";

export const Treatment = list({
  access: {
    create: isSignedIn,
    read: () => true,
    update: rules.canManageProducts,
    delete: rules.canManageProducts,
  },
  ui: {
    listView: {
      initialColumns: [
        "treatmentName",
        "price",
        "category",
        "subcategory",
        "sex",
        "user",
      ],
    },
  },
  fields: {
    treatmentName: text({ isRequired: true }),
    price: integer(),
    category: select({
      options: [
        { label: "Håndpleie", value: "HÅNDPLEIE" },
        { label: "Fotpleie", value: "FOTPLEIE" },
        { label: "Hårfjerning", value: "HÅRFJERNING" },
        { label: "Tatovering", value: "TATOVERING" },
        { label: "Vipper og Bryn", value: "VIPPER OG BRYN" },
      ],
      defaultValue: "FOTPLEIE",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "edit" },
      },
    }),
    subcategory: select({
      isRequired: true,
      options: [
        { label: "Håndpleie Dame", value: "HÅNDPLEIE DAME" },
        { label: "Håndpleie Herre", value: "HÅNDPLEIE HERRE" },
        { label: "Fotpleie Dame", value: "FOTPLEIE DAME" },
        { label: "Fotpleie Herre", value: "FOTPLEIE HERRE" },
        {
          label: "Hårfjerning - Kombo Voksing",
          value: "HÅRFJERNING KOMBO VOKSING",
        },
        {
          label: "Hårfjerning - Gravid / Sensitiv",
          value: "HÅRFJERNING GRAVID / SENSITIV",
        },
        {
          label: "Hårfjerning - Ansiktvoksing",
          value: "HÅRFJERNING ANSIKTVOKSING",
        },
        { label: "Tatovering", value: "TATOVERING" },
        { label: "Vippe", value: "VIPPE" },
        { label: "Brynsløft", value: "BRYNSLØFT" },
      ],
      ui: {
        displayMode: "select",
        createView: { fieldMode: "edit" },
      },
    }),
    shortDescription: text({
      ui: {
        displayMode: "input",
      },
    }),
    fullDescription: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    treatmentPhoto: relationship({
      ref: "TreatmentImage.treatment",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    sex: select({
      options: [
        { label: "Female only", value: "FEMALE ONLY" },
        { label: "Male only", value: "MALE ONLY" },
        { label: "Unisex", value: "UNISEX" },
      ],
      defaultValue: "FEMALE ONLY",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "edit" },
      },
    }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "AVAILABLE",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "edit" },
      },
    }),
    promoted: select({
      options: [
        { label: "False", value: "FALSE" },
        { label: "True", value: "TRUE" },
      ],
      defaultValue: "FALSE",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "edit" },
      },
    }),
    user: relationship({
      ref: "User.treatments",
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
