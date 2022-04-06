import React from "react";
import { Card, Image, Text, Badge, Button, Group, useMantineTheme, Grid } from '@mantine/core';



const PokeCard = (props) => {
    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
        ? theme.colors.dark[1]
        : theme.colors.gray[7];

    return (
        <div style={{ width: 340, margin: 'auto' }}>
            <Card shadow="sm" p="lg">
                <Card.Section>
                    <Image src={props.img} height={300} alt="" />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                    <Text weight={500}>{props.name}</Text>
                    <Badge color="pink" variant="light">
                        {props.species}
                    </Badge>
                </Group>

                <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
                    {props.description}
                </Text>

                <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
                    Add to team
                </Button>
            </Card>
        </div>

    )
}

export default PokeCard;