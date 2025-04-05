"use client"
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutPanelLeft, SparkleIcon, WandSparkles } from "lucide-react";
import AIinputBox from "@/components/custom/AIinputBox";

function CreateNew() {

  return (
    <div className="px-10 md:px-28 lg:px-64 xl:px-72 mt-20">
      <div className="flex items-center flex-col">
        <h2 className="font-bold text-3xl text-orange-600">
          CREATE NEW EMAIL TEMPLATE
        </h2>
        <p className="text-lg ">
          🎨 Design Emails Like a Pro! AI-powered customization for stunning,
          professional email templates—effortless, efficient & effective!
        </p>
        <Tabs defaultValue="account" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">Create with AI <WandSparkles className="h-5 w-5 ml-2"/></TabsTrigger>
            <TabsTrigger value="SCRATCH">Begin From Scratch <LayoutPanelLeft className="h-5 w-5 ml-2"/></TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AIinputBox/>
          </TabsContent>
          <TabsContent value="SCRATCH">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CreateNew;