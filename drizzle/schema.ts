import { relations } from "drizzle-orm";
import { boolean, index, integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {DAYS_OF_WEEK_IN_ORDER} from "@/lib/constants";


// Define a reusable `createdAt` timestamp column with default value set to now
const createdAt = timestamp("createdAt").notNull().defaultNow()

// Define a reusable `updatedAt` timestamp column with automatic update on modification
const updatedAt = timestamp("updatedAt")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()) // automatically updates to current time on update

// Define the "events" table with fields like name, description, and duration
export const EventTable = pgTable(
    "events", // table name in the database
    {
        id: uuid("id").primaryKey().defaultRandom(),
        // unique ID with default UUID
        // uuid("id"): Defines a column named "id" with the UUID type.

        // .primaryKey(): Makes this UUID the primary key of the table.

        // .defaultRandom(): Automatically fills this column with a randomly generated UUID (v4) if no value is provided.
        name: text("name").notNull(), // event name
        description: text("description"), // optional description
        durationInMinutes: integer("durationInMinutes").notNull(), // duration of the event
        clerkUserId: text("clerkUserId").notNull(),// ID of the user who created it (from Clerk)
        isActive: boolean("isActive").notNull().default(true),// whether the event is currently active
        createdAt,// timestamp when event was created
        updatedAt,// timestamp when event was last updated

    },
    table => ([
        index("clerkUserIdIndex").on(table.clerkUserId),// index on clerkUserId for faster querying
    ])
)

// Define the "schedules" table, one per user, with timezone and timestamps
export const ScheduleTable = pgTable("schedules", {
    id: uuid("id").primaryKey().defaultRandom(),         // primary key with random UUID
    timezone: text("timezone").notNull(),                // user's timezone
    clerkUserId: text("clerkUserId").notNull().unique(), // unique user ID from Clerk
    createdAt,                                           // when the schedule was created
    updatedAt,                                           // when the schedule was last updated
})

// Define relationships for the ScheduleTable: a schedule has many availabilities
export const scheduleRelations = relations(ScheduleTable, ({ many }) => ({
    availabilities: many(ScheduleAvailabilityTable), // one-to-many relationship
}))


// Define a PostgreSQL ENUM for the days of the week
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER)

// Define the "scheduleAvailabilities" table, which stores available time slots per day

export const ScheduleAvailabilityTable = pgTable(
    "scheduleAvailabilities",
    {
        id: uuid("id").primaryKey().defaultRandom(),// unique ID
        scheduleId: uuid("scheduleId") // foreign key to the Schedule table
            .notNull()
            .references(() => ScheduleTable.id, { onDelete: "cascade" }), // cascade delete when schedule is deleted
        startTime: text("startTime").notNull(), // start time of availability (e.g. "09:00")
        endTime: text("endTime").notNull(), // end time of availability (e.g. "17:00")
        dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(), // day of the week (ENUM)
    },
    table => ([
        index("scheduleIdIndex").on(table.scheduleId),           // index on foreign key for faster lookups
    ])
)

// Define the reverse relation: each availability belongs to a schedule
export const ScheduleAvailabilityRelations = relations(
    ScheduleAvailabilityTable,
    ({ one }) => ({
        schedule: one(ScheduleTable, {
            fields: [ScheduleAvailabilityTable.scheduleId], // local key
            references: [ScheduleTable.id], // foreign key
        }),
    })
)