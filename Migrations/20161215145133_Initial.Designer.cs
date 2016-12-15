using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinalProjectTest4.Migrations
{
    [DbContext(typeof(DB))]
    [Migration("20161215145133_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1");

            modelBuilder.Entity("Advance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdventId");

                    b.Property<string>("advanceIntro");

                    b.Property<string>("advanceName");

                    b.Property<DateTime>("dueDate");

                    b.Property<int>("employeeId");

                    b.Property<bool>("isAssigned");

                    b.Property<bool>("isComplete");

                    b.HasKey("Id");

                    b.HasIndex("AdventId");

                    b.ToTable("Advances");
                });

            modelBuilder.Entity("AdvanceSectionJoin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdvanceId");

                    b.Property<int?>("CategoryId");

                    b.Property<int>("SectionId");

                    b.HasKey("Id");

                    b.HasIndex("AdvanceId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("SectionId");

                    b.ToTable("AdvanceSectionJoins");
                });

            modelBuilder.Entity("Advent", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("endDate");

                    b.Property<string>("eventName");

                    b.Property<DateTime>("startDate");

                    b.HasKey("Id");

                    b.ToTable("Advents");
                });

            modelBuilder.Entity("Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("SectionId");

                    b.Property<string>("categoryName");

                    b.HasKey("Id");

                    b.HasIndex("SectionId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdventId");

                    b.Property<string>("department");

                    b.Property<string>("email");

                    b.Property<string>("fName");

                    b.Property<string>("lName");

                    b.Property<string>("phone");

                    b.Property<string>("position");

                    b.HasKey("Id");

                    b.HasIndex("AdventId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("EventLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdventId");

                    b.Property<string>("FormattedAddress");

                    b.Property<double>("Lat");

                    b.Property<double>("Lng");

                    b.HasKey("Id");

                    b.HasIndex("AdventId");

                    b.ToTable("EventLocations");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Option", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<string>("optionName");

                    b.Property<int>("optionValue");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.ToTable("Options");
                });

            modelBuilder.Entity("Section", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AdvanceId");

                    b.Property<string>("sectionDescription");

                    b.Property<string>("sectionName");

                    b.HasKey("Id");

                    b.HasIndex("AdvanceId");

                    b.ToTable("Sections");
                });

            modelBuilder.Entity("Advance", b =>
                {
                    b.HasOne("Advent")
                        .WithMany("Advances")
                        .HasForeignKey("AdventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("AdvanceSectionJoin", b =>
                {
                    b.HasOne("Advance", "Advance")
                        .WithMany("AdvanceSectionJoins")
                        .HasForeignKey("AdvanceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Category")
                        .WithMany("AdvanceSectionJoins")
                        .HasForeignKey("CategoryId");

                    b.HasOne("Section", "Section")
                        .WithMany("AdvanceSectionJoins")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Category", b =>
                {
                    b.HasOne("Section")
                        .WithMany("Categories")
                        .HasForeignKey("SectionId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Employee", b =>
                {
                    b.HasOne("Advent")
                        .WithMany("Employees")
                        .HasForeignKey("AdventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventLocation", b =>
                {
                    b.HasOne("Advent")
                        .WithMany("EventLocations")
                        .HasForeignKey("AdventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Option", b =>
                {
                    b.HasOne("Category")
                        .WithMany("Options")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Section", b =>
                {
                    b.HasOne("Advance")
                        .WithMany("Sections")
                        .HasForeignKey("AdvanceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
