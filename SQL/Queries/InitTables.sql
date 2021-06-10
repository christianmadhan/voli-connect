--use if uuid does not exit.
--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "Customer"(
    "CustomerId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "Username" VARCHAR(255) NOT NULL,
    "Password" VARCHAR(255) NOT NULL,
    "Email" VARCHAR(255) NULL,
    "EmailConfirmed" BOOLEAN NULL,
    "PublicKey" VARCHAR(255) NULL
);
ALTER TABLE
    "Customer" ADD PRIMARY KEY("CustomerId");
CREATE TABLE "CustomerInfo"(
    "CustomerInfoId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "CustomerId" UUID NOT NULL,
    "CompanyName" VARCHAR(255) NOT NULL,
    "CompanyDescription" VARCHAR(255) NULL
);
ALTER TABLE
    "CustomerInfo" ADD PRIMARY KEY("CustomerInfoId");
CREATE TABLE "CustomerMaconomy"(
    "CustomerMaconomyId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "CustomerId" UUID NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NULL,
    "RootUrl" VARCHAR(255) NOT NULL,
    "Username" VARCHAR(255) NOT NULL,
    "Password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "CustomerMaconomy" ADD PRIMARY KEY("CustomerMaconomyId");
CREATE TABLE "Component"(
    "ComponentId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,
    "CostPrice" INTEGER NULL,
    "UsagePrice" DOUBLE PRECISION NULL,
    "Active" BOOLEAN NOT NULL
);
ALTER TABLE
    "Component" ADD PRIMARY KEY("ComponentId");
CREATE TABLE "ErrorSheet"(
    "ErrorSheetId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "VoliServiceId" UUID NOT NULL,
    "CustomerMaconomyId" UUID NOT NULL,
    "CustomerComponentId" UUID NOT NULL,
    "ErrorStatusCode" VARCHAR(255) NOT NULL,
    "ErrorDescription" VARCHAR(255) NOT NULL,
    "ShortDescription" VARCHAR(255) NULL,
    "ImgUrl" VARCHAR(300) NOT NULL,
    "ErrorDate" DATE NOT NULL
);

ALTER TABLE
    "ErrorSheet" ADD PRIMARY KEY("ErrorSheetId");
CREATE TABLE "ComponentConnect"(
    "ComponentConnectId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "CustomerId" UUID NOT NULL,
    "CustomerComponentId" UUID NOT NULL,
    "CustomerMaconomyId" UUID NOT NULL,
    "VoliServiceId" UUID NOT NULL,
    "CustomerMaconomyFieldId" UUID NOT NULL,
    "MaconomyContainerId" UUID NOT NULL
);
ALTER TABLE
    "ComponentConnect" ADD PRIMARY KEY("ComponentConnectId");
CREATE TABLE "MaconomyContainer"(
    "MaconomyContainerId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "Name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "MaconomyContainer" ADD PRIMARY KEY("MaconomyContainerId");
CREATE TABLE "ComponentUsage"(
    "ComponentUsageId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "CustomerId" UUID NOT NULL,
    "CustomerComponentId" UUID NOT NULL,
    "CustomerMaconomyId" UUID NOT NULL,
    "TotalPrice" INTEGER NULL,
    "TotalUsage" DATE NULL,
    "NumberOfExecution" INTEGER NULL
);
ALTER TABLE
    "ComponentUsage" ADD PRIMARY KEY("ComponentUsageId");
CREATE TABLE "VoliService"(
    "VoliServiceId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "ComponentId" UUID NOT NULL,
    "Name" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NOT NULL,
    "Url" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "VoliService" ADD PRIMARY KEY("VoliServiceId");
CREATE TABLE "Schedular"(
    "SchedularId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "Invoiceable" VARCHAR(255) NOT NULL,
    "RunEvery" VARCHAR(255) NOT NULL,
    "ValidFrom" DATE NOT NULL,
    "ValidTo" DATE NOT NULL
);
ALTER TABLE
    "Schedular" ADD PRIMARY KEY("SchedularId");
CREATE TABLE "CustomerComponent"(
    "CustomerComponentId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "CustomerId" UUID NOT NULL,
    "ComponentId" UUID NOT NULL,
    "ScheduleId" UUID NOT NULL
);
ALTER TABLE
    "CustomerComponent" ADD PRIMARY KEY("CustomerComponentId");
CREATE TABLE "VoliServiceField"(
    "VoliServiceFieldId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "VoliceServiceId" UUID NOT NULL,
    "MaconomyContainerId" UUID NOT NULL,
    "FieldName" VARCHAR(255) NOT NULL,
    "Description" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "VoliServiceField" ADD PRIMARY KEY("VoliServiceFieldId");
CREATE TABLE "CustomerMaconomyField"(
    "CustomerMaconomyFieldId" UUID DEFAULT UUID_GENERATE_V4() NOT NULL,
    "FieldName" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "CustomerMaconomyField" ADD PRIMARY KEY("CustomerMaconomyFieldId");
ALTER TABLE
    "CustomerMaconomy" ADD CONSTRAINT "customermaconomy_customerid_foreign" FOREIGN KEY("CustomerId") REFERENCES "Customer"("CustomerId");
ALTER TABLE
    "CustomerInfo" ADD CONSTRAINT "customerinfo_customerid_foreign" FOREIGN KEY("CustomerId") REFERENCES "Customer"("CustomerId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_customercomponentid_foreign" FOREIGN KEY("CustomerComponentId") REFERENCES "CustomerComponent"("CustomerComponentId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_customermaconomyid_foreign" FOREIGN KEY("CustomerMaconomyId") REFERENCES "CustomerMaconomy"("CustomerMaconomyId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_voliserviceid_foreign" FOREIGN KEY("VoliServiceId") REFERENCES "VoliService"("VoliServiceId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_customermaconomyfieldid_foreign" FOREIGN KEY("CustomerMaconomyFieldId") REFERENCES "CustomerMaconomyField"("CustomerMaconomyFieldId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_maconomycontainerid_foreign" FOREIGN KEY("MaconomyContainerId") REFERENCES "MaconomyContainer"("MaconomyContainerId");
ALTER TABLE
    "ComponentConnect" ADD CONSTRAINT "componentconnect_customerid_foreign" FOREIGN KEY("CustomerId") REFERENCES "Customer"("CustomerId");
ALTER TABLE
    "ErrorSheet" ADD CONSTRAINT "errorsheet_voliserviceid_foreign" FOREIGN KEY("VoliServiceId") REFERENCES "VoliService"("VoliServiceId");
ALTER TABLE
    "ErrorSheet" ADD CONSTRAINT "errorsheet_customermaconomyid_foreign" FOREIGN KEY("CustomerMaconomyId") REFERENCES "CustomerMaconomy"("CustomerMaconomyId");
ALTER TABLE
    "ErrorSheet" ADD CONSTRAINT "errorsheet_customercomponentid_foreign" FOREIGN KEY("CustomerComponentId") REFERENCES "CustomerComponent"("CustomerComponentId");
ALTER TABLE
    "ComponentUsage" ADD CONSTRAINT "componentusage_customerid_foreign" FOREIGN KEY("CustomerId") REFERENCES "Customer"("CustomerId");
ALTER TABLE
    "ComponentUsage" ADD CONSTRAINT "componentusage_customercomponentid_foreign" FOREIGN KEY("CustomerComponentId") REFERENCES "CustomerComponent"("CustomerComponentId");
ALTER TABLE
    "ComponentUsage" ADD CONSTRAINT "componentusage_customermaconomyid_foreign" FOREIGN KEY("CustomerMaconomyId") REFERENCES "CustomerMaconomy"("CustomerMaconomyId");
ALTER TABLE
    "CustomerComponent" ADD CONSTRAINT "customercomponent_componentid_foreign" FOREIGN KEY("ComponentId") REFERENCES "Component"("ComponentId");
ALTER TABLE
    "CustomerComponent" ADD CONSTRAINT "customercomponent_scheduleid_foreign" FOREIGN KEY("ScheduleId") REFERENCES "Schedular"("SchedularId");
ALTER TABLE
    "VoliServiceField" ADD CONSTRAINT "voliservicefield_voliceserviceid_foreign" FOREIGN KEY("VoliceServiceId") REFERENCES "VoliService"("VoliServiceId");
ALTER TABLE
    "VoliServiceField" ADD CONSTRAINT "voliservicefield_maconomycontainerid_foreign" FOREIGN KEY("MaconomyContainerId") REFERENCES "MaconomyContainer"("MaconomyContainerId");