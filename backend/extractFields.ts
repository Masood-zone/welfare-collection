// scripts/extractFields.ts
import { readFileSync, writeFileSync } from "fs";
import { parsePrismaSchema } from "@loancrate/prisma-schema-parser";


const schemaPath = "./prisma/schema.prisma";

const schema = readFileSync(schemaPath, "utf-8");
const parsedSchema = parsePrismaSchema(schema);

interface Location {
  start: {
    offset: number;
    line: number;
    column: number;
  };
  end: {
    offset: number;
    line: number;
    column: number;
  };
}

interface Name {
  kind: string;
  value: string;
  location: Location;
}

interface TypeId {
  kind: string;
  name: Name;
}

interface FieldAttribute {
  kind: string;
  path: {
    kind: string;
    value: string[];
    location: Location;
  };
  args: any[];
  location: Location;
}

interface Member {
  kind: string;
  name: Name;
  type: TypeId | { kind: string; type: TypeId };
  attributes: FieldAttribute[];
  comment: any;
  location: Location;
}

interface Model {
  kind: string;
  name: Name;
  members: Member[];
  location: Location;
}

interface Declarations {
  declarations: Model[];
}

interface ExtractedModel {
  modelName: string;
  fields: string[];
}
const extractModels = (data: Declarations): ExtractedModel[] => {
  writeFileSync("./generatedSchema.json", JSON.stringify(data, null, 2));
  return data.declarations.map((model) => {
    if (model.name) {
      const modelName = model.name.value;
      const fields = model.members
        .filter((member) => {
          if (member.type && member.type.kind && member.type.kind === "list") {
            return false;
          }
          if (
            member.attributes &&
            member.attributes.some((attr) =>
              attr.path.value.includes("relation")
            )
          ) {
            return false;
          }
          // if (member.attributes && member.attributes.length > 0) return false;
          return true;
        })
        .map((member) => member.name.value);
      return {
        modelName,
        fields,
      };
    } else {
      return {
        modelName: "",
        fields: [],
      };
    }
  });
};

const allowedFields = extractModels(parsedSchema as Declarations);

writeFileSync("./generatedSchema.json", JSON.stringify(parsedSchema, null, 2));
writeFileSync("./allowedFields.json", JSON.stringify(allowedFields, null, 2));
