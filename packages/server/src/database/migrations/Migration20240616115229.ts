import { Migration } from '@mikro-orm/migrations';

export class Migration20240616115229 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "intents" ("id" serial primary key, "intent" varchar(100) not null, "utterance" vector(1536) not null);');
    this.addSql('CREATE INDEX "intents_hnsw_l2_idx" ON "intents" USING hnsw (utterance vector_l2_ops);');

    this.addSql('create table "media" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "filename" varchar(255) not null, "mime_type" varchar(255) not null, "height" int not null, "width" int not null);');
    this.addSql('alter table "media" add constraint "media_name_unique" unique ("name");');

    this.addSql('create table "knob" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null);');
    this.addSql('alter table "knob" add constraint "knob_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "knob_hnsw_l2_idx" ON "knob" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "jack" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null, "is_side" boolean not null);');
    this.addSql('alter table "jack" add constraint "jack_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "jack_hnsw_l2_idx" ON "jack" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "headstock" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null, "string_count" smallint not null, "pegs_spawn_point" jsonb not null, "front_shadow_texture_id" int null, "back_shadow_texture_id" int null);');
    this.addSql('alter table "headstock" add constraint "headstock_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "headstock_hnsw_l2_idx" ON "headstock" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "guitar_body_contour" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "price" int not null default 0, "shadow_texture_id" int null, "specular_texture_id" int null);');

    this.addSql('create table "guitar_body" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "mask_id" int null, "back_mask_id" int null, "burst_top_id" int null, "burst_back_id" int null, "price" int not null default 0);');

    this.addSql('create table "guitar_body_contour_pivot" ("id" serial primary key, "body_id" int not null, "texture_id" int null, "type" text check ("type" in (\'topFlatContour\', \'topCarvedContour\', \'topForearmContour\', \'backFlatContour\', \'backCarvedContour\', \'backTummyContour\')) not null);');
    this.addSql('alter table "guitar_body_contour_pivot" add constraint "guitar_body_contour_pivot_body_id_texture_id_type_unique" unique ("body_id", "texture_id", "type");');

    this.addSql('create table "electric_guitar_model" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "fingerboard_spawn_point" jsonb null, "fingerboard_back_end_spawn_point" jsonb null, "bridge_spawn_point" jsonb null, "price" int not null, "pickup_spawn_point" jsonb null, "mask_scale" real null, "knob_spawn_point" jsonb null, "switch_spawn_point" jsonb null, "top_jack_spawn_point" jsonb null, "side_jack_spawn_point" jsonb null);');
    this.addSql('alter table "electric_guitar_model" add constraint "electric_guitar_model_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "electric_guitar_model_hnsw_l2_idx" ON "electric_guitar_model" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "electric_model_body_pivot" ("id" serial primary key, "model_id" int not null, "body_id" int null, "type" text check ("type" in (\'boltOnBody\', \'neckThroughBody\', \'setInBody\')) not null);');
    this.addSql('alter table "electric_model_body_pivot" add constraint "electric_model_body_pivot_model_id_body_id_type_unique" unique ("model_id", "body_id", "type");');

    this.addSql('create table "bridge" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null, "string_count" smallint not null, "string_spawn_point" jsonb not null);');
    this.addSql('alter table "bridge" add constraint "bridge_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "bridge_hnsw_l2_idx" ON "bridge" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "acoustic_guitar_model" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "fingerboard_spawn_point" jsonb null, "fingerboard_back_end_spawn_point" jsonb null, "bridge_spawn_point" jsonb null, "price" int not null, "mask_scale" real null, "jack_spawn_point" jsonb null, "none_cutaway_mask_id" int null, "soft_cutaway_mask_id" int null, "venetian_cutaway_mask_id" int null, "florentine_cutaway_mask_id" int null, "none_cutaway_burst_id" int null, "soft_cutaway_burst_id" int null, "venetian_cutaway_burst_id" int null, "florentine_cutaway_burst_id" int null);');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "acoustic_guitar_model_hnsw_l2_idx" ON "acoustic_guitar_model" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "nut" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null, "string_count" smallint not null, "string_spawn_point" jsonb not null);');
    this.addSql('alter table "nut" add constraint "nut_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "nut_hnsw_l2_idx" ON "nut" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "peg" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "peg_cap_texture_id" int null, "peg_back_texture_id" int null, "peg_back_pivot_position" jsonb not null, "scale" real not null, "pivot_position" jsonb not null);');
    this.addSql('alter table "peg" add constraint "peg_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "peg_hnsw_l2_idx" ON "peg" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "pickguard" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "price" int not null, "texture_id" int null, "model_id" int not null);');
    this.addSql('alter table "pickguard" add constraint "pickguard_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "pickguard_hnsw_l2_idx" ON "pickguard" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "pickup" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null, "type" text check ("type" in (\'single\', \'humbucker\', \'p90\')) not null, "string_count" int not null);');
    this.addSql('alter table "pickup" add constraint "pickup_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "pickup_hnsw_l2_idx" ON "pickup" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "switch" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "thumbnail_id" int null, "price" int not null, "texture_id" int null, "scale" real not null, "pivot_position" jsonb not null);');
    this.addSql('alter table "switch" add constraint "switch_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "switch_hnsw_l2_idx" ON "switch" USING hnsw (embedding vector_l2_ops);');

    this.addSql('create table "wood" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(1000) not null, "embedding" vector(1536) null, "price" int not null, "texture_id" int null);');
    this.addSql('alter table "wood" add constraint "wood_name_unique" unique ("name");');
    this.addSql('CREATE INDEX "wood_hnsw_l2_idx" ON "wood" USING hnsw (embedding vector_l2_ops);');

    this.addSql('alter table "knob" add constraint "knob_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "knob" add constraint "knob_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "jack" add constraint "jack_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "jack" add constraint "jack_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "headstock" add constraint "headstock_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "headstock" add constraint "headstock_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "headstock" add constraint "headstock_front_shadow_texture_id_foreign" foreign key ("front_shadow_texture_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "headstock" add constraint "headstock_back_shadow_texture_id_foreign" foreign key ("back_shadow_texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "guitar_body_contour" add constraint "guitar_body_contour_shadow_texture_id_foreign" foreign key ("shadow_texture_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "guitar_body_contour" add constraint "guitar_body_contour_specular_texture_id_foreign" foreign key ("specular_texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "guitar_body" add constraint "guitar_body_mask_id_foreign" foreign key ("mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "guitar_body" add constraint "guitar_body_back_mask_id_foreign" foreign key ("back_mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "guitar_body" add constraint "guitar_body_burst_top_id_foreign" foreign key ("burst_top_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "guitar_body" add constraint "guitar_body_burst_back_id_foreign" foreign key ("burst_back_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "guitar_body_contour_pivot" add constraint "guitar_body_contour_pivot_body_id_foreign" foreign key ("body_id") references "guitar_body" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "guitar_body_contour_pivot" add constraint "guitar_body_contour_pivot_texture_id_foreign" foreign key ("texture_id") references "guitar_body_contour" ("id") on update cascade on delete set null;');

    this.addSql('alter table "electric_guitar_model" add constraint "electric_guitar_model_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "electric_model_body_pivot" add constraint "electric_model_body_pivot_model_id_foreign" foreign key ("model_id") references "electric_guitar_model" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "electric_model_body_pivot" add constraint "electric_model_body_pivot_body_id_foreign" foreign key ("body_id") references "guitar_body" ("id") on update cascade on delete set null;');

    this.addSql('alter table "bridge" add constraint "bridge_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "bridge" add constraint "bridge_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_none_cutaway_mask_id_foreign" foreign key ("none_cutaway_mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_soft_cutaway_mask_id_foreign" foreign key ("soft_cutaway_mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_venetian_cutaway_mask_id_foreign" foreign key ("venetian_cutaway_mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_florentine_cutaway_mask_id_foreign" foreign key ("florentine_cutaway_mask_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_none_cutaway_burst_id_foreign" foreign key ("none_cutaway_burst_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_soft_cutaway_burst_id_foreign" foreign key ("soft_cutaway_burst_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_venetian_cutaway_burst_id_foreign" foreign key ("venetian_cutaway_burst_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "acoustic_guitar_model" add constraint "acoustic_guitar_model_florentine_cutaway_burst_id_foreign" foreign key ("florentine_cutaway_burst_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "nut" add constraint "nut_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "nut" add constraint "nut_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "peg" add constraint "peg_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "peg" add constraint "peg_peg_cap_texture_id_foreign" foreign key ("peg_cap_texture_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "peg" add constraint "peg_peg_back_texture_id_foreign" foreign key ("peg_back_texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "pickguard" add constraint "pickguard_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "pickguard" add constraint "pickguard_model_id_foreign" foreign key ("model_id") references "electric_guitar_model" ("id") on update cascade;');

    this.addSql('alter table "pickup" add constraint "pickup_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "pickup" add constraint "pickup_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "switch" add constraint "switch_thumbnail_id_foreign" foreign key ("thumbnail_id") references "media" ("id") on update cascade on delete set null;');
    this.addSql('alter table "switch" add constraint "switch_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');

    this.addSql('alter table "wood" add constraint "wood_texture_id_foreign" foreign key ("texture_id") references "media" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "knob" drop constraint "knob_thumbnail_id_foreign";');

    this.addSql('alter table "knob" drop constraint "knob_texture_id_foreign";');

    this.addSql('alter table "jack" drop constraint "jack_thumbnail_id_foreign";');

    this.addSql('alter table "jack" drop constraint "jack_texture_id_foreign";');

    this.addSql('alter table "headstock" drop constraint "headstock_thumbnail_id_foreign";');

    this.addSql('alter table "headstock" drop constraint "headstock_texture_id_foreign";');

    this.addSql('alter table "headstock" drop constraint "headstock_front_shadow_texture_id_foreign";');

    this.addSql('alter table "headstock" drop constraint "headstock_back_shadow_texture_id_foreign";');

    this.addSql('alter table "guitar_body_contour" drop constraint "guitar_body_contour_shadow_texture_id_foreign";');

    this.addSql('alter table "guitar_body_contour" drop constraint "guitar_body_contour_specular_texture_id_foreign";');

    this.addSql('alter table "guitar_body" drop constraint "guitar_body_mask_id_foreign";');

    this.addSql('alter table "guitar_body" drop constraint "guitar_body_back_mask_id_foreign";');

    this.addSql('alter table "guitar_body" drop constraint "guitar_body_burst_top_id_foreign";');

    this.addSql('alter table "guitar_body" drop constraint "guitar_body_burst_back_id_foreign";');

    this.addSql('alter table "electric_guitar_model" drop constraint "electric_guitar_model_thumbnail_id_foreign";');

    this.addSql('alter table "bridge" drop constraint "bridge_thumbnail_id_foreign";');

    this.addSql('alter table "bridge" drop constraint "bridge_texture_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_thumbnail_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_none_cutaway_mask_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_soft_cutaway_mask_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_venetian_cutaway_mask_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_florentine_cutaway_mask_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_none_cutaway_burst_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_soft_cutaway_burst_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_venetian_cutaway_burst_id_foreign";');

    this.addSql('alter table "acoustic_guitar_model" drop constraint "acoustic_guitar_model_florentine_cutaway_burst_id_foreign";');

    this.addSql('alter table "nut" drop constraint "nut_thumbnail_id_foreign";');

    this.addSql('alter table "nut" drop constraint "nut_texture_id_foreign";');

    this.addSql('alter table "peg" drop constraint "peg_thumbnail_id_foreign";');

    this.addSql('alter table "peg" drop constraint "peg_peg_cap_texture_id_foreign";');

    this.addSql('alter table "peg" drop constraint "peg_peg_back_texture_id_foreign";');

    this.addSql('alter table "pickguard" drop constraint "pickguard_texture_id_foreign";');

    this.addSql('alter table "pickup" drop constraint "pickup_thumbnail_id_foreign";');

    this.addSql('alter table "pickup" drop constraint "pickup_texture_id_foreign";');

    this.addSql('alter table "switch" drop constraint "switch_thumbnail_id_foreign";');

    this.addSql('alter table "switch" drop constraint "switch_texture_id_foreign";');

    this.addSql('alter table "wood" drop constraint "wood_texture_id_foreign";');

    this.addSql('alter table "guitar_body_contour_pivot" drop constraint "guitar_body_contour_pivot_texture_id_foreign";');

    this.addSql('alter table "guitar_body_contour_pivot" drop constraint "guitar_body_contour_pivot_body_id_foreign";');

    this.addSql('alter table "electric_model_body_pivot" drop constraint "electric_model_body_pivot_body_id_foreign";');

    this.addSql('alter table "electric_model_body_pivot" drop constraint "electric_model_body_pivot_model_id_foreign";');

    this.addSql('alter table "pickguard" drop constraint "pickguard_model_id_foreign";');

    this.addSql('drop table if exists "intents" cascade;');

    this.addSql('drop table if exists "media" cascade;');

    this.addSql('drop table if exists "knob" cascade;');

    this.addSql('drop table if exists "jack" cascade;');

    this.addSql('drop table if exists "headstock" cascade;');

    this.addSql('drop table if exists "guitar_body_contour" cascade;');

    this.addSql('drop table if exists "guitar_body" cascade;');

    this.addSql('drop table if exists "guitar_body_contour_pivot" cascade;');

    this.addSql('drop table if exists "electric_guitar_model" cascade;');

    this.addSql('drop table if exists "electric_model_body_pivot" cascade;');

    this.addSql('drop table if exists "bridge" cascade;');

    this.addSql('drop table if exists "acoustic_guitar_model" cascade;');

    this.addSql('drop table if exists "nut" cascade;');

    this.addSql('drop table if exists "peg" cascade;');

    this.addSql('drop table if exists "pickguard" cascade;');

    this.addSql('drop table if exists "pickup" cascade;');

    this.addSql('drop table if exists "switch" cascade;');

    this.addSql('drop table if exists "wood" cascade;');
  }

}