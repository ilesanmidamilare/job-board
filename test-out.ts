model Account {
  id                String    @id @default(cuid())       // Unique user id
  userId            String  
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade )

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user User @relation(fields: [userId], references: [id], onDelete: Cascade )
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model User {
  id String @id @default(cuid())
  name String?
  email String? @unique
  emailVerified DateTime?
  image String?

  accounts Account[]

  sessions Session[]

  jobs Job[] @relation("PostedJobs")

  applications Application[]
}

model Job {
  id String   @id @default(cuid())
  title String
  company String
  location String
  type String
  description String @db.Text
  salary String?

  postedAt DateTime @default(now())
  postedBy User @relation("PostedJobs", fields: [postedById], references: [id])
  postedById String

  applications Application[]
}

model Application {
  id String   @id @default(cuid())
  jobId String
  userId String
  status String @default("PENDING") // PENDING REVIEWING, ACCEPPTED, REJECTED
  applyAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id] )
  job Job @relation(fields: [jobId], references: [id])

  @@unique([jobId, userId])
}
