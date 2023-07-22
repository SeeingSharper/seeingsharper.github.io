---
title: An ode to C# and .NET
categories: [blogging, dotnet]
tags: [dotnet, csharp]
---

## This Ain't Your Daddy's Microsoft
I feel the need to address this as soon as possible.

In my interactions with people using different tech stacks, I often find myself reflecting on their reactions when I mention that I develop using .NET (pronounced 'dot net'). It seems as though this reaction is predominantly due to the association with Microsoft - which some people still perceive as a negative. When prodded a bit further, this reaction seems to be a hangover from the Microsoft of the 90s. The perception they still seem to have is of Steve Ballmer's Microsoft when he famously dubbed open-source as a "cancer." While I understand their hesitation, I also find it slightly ironic - and somewhat amusing - that many of these critics frequently use VSCode (an excellent Microsoft product) as their primary editor and push their code to repositories on (Microsoft-owned) GitHub.

One of the key indicators of Microsoft's culture shift has been none other than Mark Russinovich, once a vocal critic of Microsoft's practices, now the man responsible for Microsoft's cloud platform, Azure. Known for his profound technical expertise and history of shedding light on Microsoft's dishonest business practices in the past, Russinovich's transition from critic to key contributor signifies a tremendous shift in Microsoft's approach to openness and the open-source community.

Though it may sound like I'm a Microsoft fanboy, I am truly amazed at how this corporate giant managed to shift so drastically in such a short amount of time. This evolution was largely due to their new focus on Azure rather than Windows as their primary source of income but it just goes to show that developers working at Microsoft were ready for this shift when Satya Nadella took charge. Of course, they are still a huge corporation with demanding shareholders - they are not completely open with everything, but is it fair to expect them to be? How many corporations are?

## What is .NET?
When I started my first job, straight out of a Java bootcamp, I was somewhat unfamiliar with .NET. I knew my new job required me to write in C#, but the recurring references to .NET were puzzling. I'd seen .NET mentioned before during software installations on my Windows PC, which made me curious about what it exactly is.

I knew that .NET was instrumental in running the C# codebase, but it took a bit of time to understand exactly what .NET was and how it operated. In essence, .NET is a framework used to build applications. It includes a runtime environment, the Common Language Runtime (CLR), and an intermediary language known as the Intermediate Language (IL), akin to Java's JVM and bytecode respectively.

Although C# is the most common language for developing .NET applications, any language with a decent compiler for IL can be used. When a particular piece of code is executed, the IL is Just-In-Time (JIT) compiled into machine code, providing near-native execution speeds.

## What's the Big Deal?
When .NET was initially released, it was a Windows-only framework. However, in 2016, Microsoft announced a significant revamp, introducing .NET Core (later rebranded to just .NET). This new iteration of .NET wasn't tied to Windows anymore; it could run virtually anywhere - Linux, MacOS, Android, iOS. And, in a move that surprised many in the tech world, Microsoft open-sourced .NET, a decision that signaled a radical shift in the company's strategy.

## C#

I'm going to be very open about the fact that C# has been my primary development programming language since the beginning of my career as a  software developer. I've used some others professionally (Python, Javascript, TypeScript, SQL) and I've taught myself others for side projects (GoLang, Rust, C++), but C# is the one that I've felt the most at home in. It is packed with some amazing quality-of-life features for developers that make it a tough choice for me to forgo when I need to build something that I know will not only run reliably in production but will be a pleasure to use too.

As the main language in use with .NET, Unity (and now available on Godot), C# allows you to build almost anything from games to any kind of web, desktop or mobile application that you could want.

Statically typed, it can be written in an Object-Oriented or functional style. It relies on garbage collection, so there's generally no need to free resources explicitly although it gives you mechanisms to do so when there is. It can go into Unsafe mode, which allows direct manipulation of pointers and can also easily interop with C and C++ code, so when you need to go low-level or bypass the framework and speak directly to the operating system, it's also possible in your C# applications.

## Innovation and Evolution
Microsoft employed one of the best-known language creators to work on C#, Anders Hejlsberg, who had previously created Turbo Pascal and Delphi. More recently, he also developed TypeScript. Hejlsberg designed C# to resemble and function much like C++ and Java, allowing developers familiar with these languages to easily adopt C#. Moreover, he introduced quality-of-life improvements that other languages have since incorporated.

If you've ever used the async-await feature in your applications, you have Hejlsberg to thank. He pioneered this feature in C# on .NET. C# also incorporates a powerful feature known as Language Integrated Query (LINQ), a remarkably powerful tool for working with and transforming data in your applications. Not only with in-memory data, but developers can also use LINQ to query underlying databases without writing a single line of SQL.

When I first explored ECMAScript 5, especially Accessors (Properties in C#) and the new Array methods (LiNQ), it felt like I was dealing with "JavaScript, C# edition," as these features had been present in C# for many years prior.

## The Community
.NET boasts a thriving ecosystem of third-party packages, easily accessible via NuGet, their package manager. There's a library for nearly any problem you might encounter in your daily work, and many are open-source. Most technologies you wish to integrate with will likely have a reliable package you can use to get up and running in minutes. I hope to cover some of my favorite ones in future blog posts.

Even dealing with 3rd parties in my daily work, if they have an SDK, they will generally have one in C#.
Several meetups, conferences, blogs, and resources focus on .NET. Even popular developer sites like StackExchange and StackOverflow use .NET technologies.

## Tech Meets Business Needs
With so many options at our disposal, it can sometimes be quite daunting. Need a mobile app? MAUI has you covered. Looking for desktop application development? There's WPF and Windows Forms (if you don't mind a dated UI), or you can explore community-driven, cross-platform solutions like Uno and Avalonia. For Web APIs, there's ASP.NET Core. Interested in Web Assembly? No problem with Blazor. And if you wish to mix your WebAssembly with desktop applications, it's also possible - using the same memory space too - with hybrid apps. In other words, the world is your oyster with .NET; if a business has a problem, you can be confident that you will find a solution within the .NET ecosystem.

## It's Not All Sunshine and Roses
Microsoft hasn't been great at explicitly deprecating things. Instead, they tend to quietly leave some things out of future updates, leaving the community to fill in the gaps (looking at you, WCF).

Their naming conventions can also be a bit obscure or confusing, as they often change the name of a technology that (for all intents and purposes) performs the same function (like Xamarin to MAUI, or Team Foundation Server to TFSOnline to Azure Devops). Blazor is in its infancy, and the future vision behind some of the desktop technologies seems unclear to me.

That being said though, I think .NET is a great choice for a stack. It's easy and flexible to use with great tooling around it.
Microsoft's future never looked brighter and I trust them to continuously improve it with time.

